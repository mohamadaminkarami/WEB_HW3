package lru

import (
	"container/list"
)

type Cache struct {
	capacity int
	list     *list.List
	elements map[string]*list.Element
}

type KeyPair struct {
	key   string
	value string
}

func New(capacity int) Cache {
	return Cache{
		capacity: capacity,
		list:     new(list.List),
		elements: make(map[string]*list.Element, capacity),
	}
}

func (cache *Cache) Get(key string) (string, bool) {
	if node, ok := cache.elements[key]; ok {
		value := node.Value.(*list.Element).Value.(KeyPair).value
		cache.list.MoveToFront(node)
		return value, true
	}
	return "", false
}

func (cache *Cache) Put(key string, value string) {
	if node, ok := cache.elements[key]; ok {
		cache.list.MoveToFront(node)
		node.Value.(*list.Element).Value = KeyPair{key: key, value: value}
	} else {
		if cache.list.Len() == cache.capacity {
			idx := cache.list.Back().Value.(*list.Element).Value.(KeyPair).key
			delete(cache.elements, idx)
			cache.list.Remove(cache.list.Back())
		}
	}

	node := &list.Element{
		Value: KeyPair{
			key:   key,
			value: value,
		},
	}

	pointer := cache.list.PushFront(node)
	cache.elements[key] = pointer
}

func (cache *Cache) Purge() {
	cache.capacity = 0
	cache.elements = nil
	cache.list = nil
}
