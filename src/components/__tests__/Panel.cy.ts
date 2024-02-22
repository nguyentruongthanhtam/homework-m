import Panel from '../Panel.vue'
import {store} from '@/store'
import json  from '@/assets/assigment.json'
describe('Panel', () => {
  it('Falsy if does not contain text BroomCabinet_04 is at Level 4', () => {
    cy.mount(Panel)
    const firstCellIndex = 0
    store.chosenCell = firstCellIndex
    cy.get('.text-wrapper > h2').contains(json.items[firstCellIndex]?.itemType + ' is at')
    cy.get('.text-wrapper > h1').contains('Level ' + json.items[firstCellIndex]?.itemLevel )
  })
})
