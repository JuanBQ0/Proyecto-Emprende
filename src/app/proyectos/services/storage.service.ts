import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private prefix = 'ue_';
  private key(k: string) { return `${this.prefix}${k}`; }

  get<T>(k: string): T | null {
    const raw = localStorage.getItem(this.key(k));
    return raw ? JSON.parse(raw) as T : null;
  }

  set<T>(k: string, data: T) {
    localStorage.setItem(this.key(k), JSON.stringify(data));
  }

  list<T>(k: string): T[] {
    return this.get<T[]>(k) ?? [];
  }

  push<T>(k: string, item: T) {
    const arr = this.list<T>(k);
    arr.push(item);
    this.set(k, arr);
  }

  remove(k: string) {
    localStorage.removeItem(this.key(k));
  }
}
