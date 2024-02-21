// store.js
import {ref, reactive } from 'vue'
import jsonData  from './assets/assigment.json'
export interface JsonData {
  boardId: string
  width: number
  height: number
  items: (Item | null | undefined)[]
}

export interface Item {
  itemId?: number | null
  itemType: string
  chainId: string
  pausedUntil?: string|null
  createdAt?: string | null
  visibility: 'visible' | 'hidden'
  itemLevel: number
  isInsideBubble: boolean
}

export type ItemType = 'itemId' |'itemType' | 'chainId' | 'pausedUntil' | 'createdAt' | 'visibility' | 'itemLevel' | 'isInsideBubble'

export const store = reactive({
  chosenCell: -1,
  data: jsonData as JsonData,
  isAddModalOn: false,
  isEditModalOn: false,
  updateValue(type: ItemType, newValue: string|number|boolean) {
    if(this.data.items[this.chosenCell]) {
      (this.data.items[this.chosenCell] as unknown as Record<string, string | number | boolean>)[type] = newValue
    }
  },
  removeItem(index: number) {
    this.data.items[index] = null
  },
  isCellEmpty() {
    return this.data.items[this.chosenCell] === null
  },
  toggleAddModal() {
    this.isAddModalOn = !this.isAddModalOn
  },
  toggleEditModal() {
    this.isEditModalOn = !this.isEditModalOn
  },
  addItemToBoard(newItem: Item, index: number) {
    return this.data.items[index] = newItem
  }
})