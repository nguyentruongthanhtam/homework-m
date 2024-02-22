// store.js
import { reactive } from 'vue'
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
  chosenLevel: 0,
  data: jsonData as JsonData,
  isModalOn: false,
  isAddModalOn: false,
  isEditModalOn: false,
  updateValue(type: ItemType, newValue: string|number|boolean) {
    if(this.data.items[this.chosenCell]) {
      (this.data.items[this.chosenCell] as unknown as Record<string, string | number | boolean>)[type] = newValue
    }
  },
  setValue(item:Item) {
    this.data.items[this.chosenCell] = item
  },
  removeItem(index: number) {
    this.data.items[index] = null
    this.chosenCell = -1
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
  toggleModal() {
    this.isModalOn = !this.isModalOn
  },
  addItemToBoard(newItem: Item, index: number) {
    return this.data.items[index] = newItem
  },
  getMaxLevelOfByItemChain(chainId: string | undefined) {
    if (chainId) {
      const arrayOfTheSameChainId: Item[] = store.data.items.filter(
        (item) => item?.chainId === chainId
      ) as Item[]
  
      let biggestKey1Value: number = -1
      for (const obj of arrayOfTheSameChainId) {
        if (obj?.itemLevel && obj?.itemLevel > biggestKey1Value) {
          biggestKey1Value = obj?.itemLevel
        }
      }
      const result = []
      for (let index = 0; index < biggestKey1Value; index++) {
        result[index] = null
        // since index of array start from 0 and level start from 1
        // that's why item.itemLevel - 1
        const level = arrayOfTheSameChainId.find((item) => item.itemLevel - 1 === index)
        if (level) {
          result[index] = level
        }
      }
      store.chosenLevel = store.data.items[store.chosenCell]?.itemLevel!
      console.log(store.chosenLevel)
      return result
    }
    return null
  }
  
})