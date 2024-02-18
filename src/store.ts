// store.js
import {ref, reactive } from 'vue'
import jsonData  from './assets/assigment.json'
export interface JsonData {
  boardId: string
  width: number
  height: number
  items: (Item | null)[]
}

export interface Item {
  itemId: number
  itemType: string
  chainId: string
  pausedUntil: string|null
  createdAt: string
  visibility: 'hidden' | 'visible'
  itemLevel: number
  isInsideBubble: boolean
}

export type ItemType = 'itemId' |'itemType' | 'chainId' | 'pausedUntil' | 'createdAt' | 'visibility' | 'itemLevel' | 'isInsideBubble'
const data : JsonData = jsonData;
export const store = reactive({
  chosenCell: ref(-1),
  data,
  updateValue(type: ItemType, index:number, newValue: string|number|boolean) {
    if(data.items[index]) {
      (data.items[index] as unknown as Record<string, string | number | boolean | 'hidden' | 'visible'>)[type] = newValue
    }
  },
})