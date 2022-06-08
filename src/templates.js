export const data_item = (name, type) => `<li class="datalist__item data">
    <div class="data__name">${name}</div>
    <div class="data__type">${type}</div>
</li>`

export const option = (name, value) => `<option value="${value}">${name}</option>`

export const data_item_counted = (name, type, count) => `<li class="datalist__item data">
    <div class="data__name">${name}</div>
    <div class="data__type">${type}</div>
    <div class="data__count">${count}</div>
</li>`

