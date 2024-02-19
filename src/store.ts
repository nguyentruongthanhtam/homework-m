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
  itemId: number
  itemType: string
  chainId: string
  pausedUntil: string|null
  createdAt: string
  visibility: string
  itemLevel: number
  isInsideBubble: boolean
}

export type ItemType = 'itemId' |'itemType' | 'chainId' | 'pausedUntil' | 'createdAt' | 'visibility' | 'itemLevel' | 'isInsideBubble'
export const store = reactive({
  chosenCell: -1,
  data: jsonData,
  isModalOn: false,
  updateValue(type: ItemType, newValue: string|number|boolean) {
    if(this.data.items[this.chosenCell]) {
      (this.data.items[this.chosenCell] as unknown as Record<string, string | number | boolean>)[type] = newValue
    }
  },
  removeItem() {
    this.data.items[this.chosenCell] = null
  },
  isCellEmpty() {
    return this.data.items[this.chosenCell] === null
  },
  toggleModal() {
    this.isModalOn = !this.isModalOn
  }

})