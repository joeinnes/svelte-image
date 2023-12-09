import { writable } from 'svelte/store';

export const provider = writable({ name: 'statically', key: null });
