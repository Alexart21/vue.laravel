<template>
  <h1>Тест бронирования</h1>
  <div v-if="table.length">
    <table class="test-table" ref="testTbl">
      <h4 style="text-align: center">Выберите время</h4>
      <tr v-for="(row, rowIndex) in table" :key="rowIndex">
        <td v-for="(item, itemIndex) in row" :id="String(rowIndex) + String(itemIndex)" :key="itemIndex"
            :class="[!item?.string ? 'data-td' : 'data-h', item.isActive ? 'cursor' : '', item.isActive ? '' : !item?.string ? 'passive' : '']"
            @click="select(rowIndex, itemIndex)">{{ item?.string ?? item?.time }}
        </td>
      </tr>
    </table>
    <div v-if="statusText" :style="{color: isOk ? 'green' : 'red'}">{{ statusText }}</div>
    <div v-if="selected">
      <p>Выбрано: <b>{{ selectedText }}</b></p>
      <button @click="clear()">отменить</button>
      <br>
      <button @click="setOrder()" style="background: green;color: #fff">бронировать</button>
      <span> (отправка на сервер не реализована)</span>
    </div>
  </div>
  <div v-else>загрузка данных...</div>
  <hr>
  <h2>Реализация админки</h2>
  <p>(в режиме contenteditable)</p>
  <p>Для удаленмя ячейки удалить ее содержимое и нажать сохранить, изменить статус - doubleclick</p>
  <table class="test-table" ref="testTblAdmin">
    <tr v-for="(row, rowIndex) in tableAdmin" :key="rowIndex">
      <template v-for="(item, itemIndex) in row" :key="itemIndex">
        <td v-if="itemIndex === 0">
          <datepicker
            v-model="picked[rowIndex]"
            :locale="locale"
            :inputFormat="inputFormat"
            class="data"
          />
        </td>
        <td v-else :id="'adm' + String(rowIndex) + String(itemIndex)" @dblclick="changeStatus(rowIndex, itemIndex)"
            :contenteditable="item.isActive" class="data data-td" :class="item.isActive ? '' : 'passive'">{{ item.time }}
        </td>
        <template v-if="itemIndex === tableAdmin[rowIndex].length - 1">
          &nbsp;&nbsp;<td>
          <button @click="addCell(rowIndex)" class="add">добавить ячейку</button>
        </td>
          <td>
            <button @click="delRow(rowIndex)" class="del">удалить строку</button>
          </td>
        </template>

      </template>
    </tr>
  </table>
  <div v-if="statusText" :style="{color: isOk ? 'green' : 'red'}">{{ statusText }}</div>
  <button @click="addRow()">добавить строку</button>
  <br>
  <button @click="save()">сохранить</button>
</template>

<script>
import {id, ru} from 'date-fns/locale'
import Datepicker from "vue3-datepicker";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      table: [],
      tableAdmin: [],
      selected: null,
      selectedText: '',
      token: '',
      tokenType: '',
      picked: [],
      locale: ru,
      inputFormat: 'EEEE yyyy-MM-dd',
      isOk: true,
      statusText: ''
    }

  },
  methods: {
    async getTableData() {
      this.isOk = true;
      this.statusText = '';
      let url = '/api/test';
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: this.tokenType + ' ' + this.token
        },
      });
      if (response.ok) {
        let result = await response.json();
        // console.log(result.data);
        this.table = result.data;
        this.tableAdmin = this.table.slice(); // независимая копия
      } else {
        if (response.status == 401) {
          this.isOk = false;
          this.statusText = 'Требуется авторизация!';
        }
        console.log('Error');
        console.log(response);
      }
    },
    clear() {
      this.selected = null;
      this.selectedText = '';
      this.statusText = '';
      let tds = this.$refs.testTbl.getElementsByTagName('td');
      for (let td of tds) {
        td.classList.remove('selected');
      }

    },
    select(rowIndex, itemIndex) {
      if (this.table[rowIndex][itemIndex].isActive) {
          this.clear();
          document.getElementById(String(rowIndex) + String(itemIndex)).classList.add('selected');
          this.selected = {
            row: rowIndex,
            item: itemIndex
          };
        this.selectedText = `${this.table[rowIndex][0].string} ${this.table[rowIndex][itemIndex].time}`;
      }
    },
    setOrder(){
      if(this.selected){
        console.log('bron');
        this.table[this.selected.row][this.selected.item].isActive = false;
        this.statusText = 'забронировано';
      }
    },
    addRow() {
      let row = this.tableAdmin[0] ?? [{time: '00:00 - 00:00', isActive: true}, {time: '00:00 - 00:00', isActive: true}, {time: '00:00 - 00:00', isActive: true}, {time: '00:00 - 00:00', isActive: true}, {time: '00:00 - 00:00', isActive: true}];
      this.tableAdmin.push(row);
    },
    delRow(index) {
      this.tableAdmin.splice(index, 1);
      this.picked.splice(index, 1);
    },
    addCell(index) {
      this.tableAdmin[index].push({isActive: true, time: '00:00 - 00:00'});
    },
    changeStatus(rowIndex, itemIndex) {
      console.log('change status');
      this.tableAdmin[rowIndex][itemIndex].isActive = !this.tableAdmin[rowIndex][itemIndex].isActive;
    },
    async save() {
      // console.log(this.picked);
      this.isOk = true;
      this.statusText = '';
      let result = [];
      let idArr = [];
      let trs = this.$refs.testTblAdmin.getElementsByTagName('tr');
      trs = Array.from(trs);
      let i = 0;
      trs.map((tr) => {
        let tds = tr.getElementsByClassName('data');
        tds = Array.from(tds);
        result[i] = [];
        let j = 0;
        tds.map((td) => {
          let val = {};
          if (td.innerText === '' && j === 0) { // ячейка с датой
            try {
              val.string = this.picked[i].toLocaleString('ru', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });
              val.timestamp = Date.parse(this.picked[i])
              // console.log(val);
            } catch (e) {
              this.isOk = false;
              this.statusText = 'Не выбрана дата!';
              return;
            }
          } else {
            val.time = td.innerText;
            val.isActive = this.tableAdmin[i][j].isActive;
            let id = td.getAttribute('id');
            if (id) { //
              idArr.push(id) // создаем массив с id ячеек со временем
            }
          }
          result[i].push(val);
          j++;
        });
        i++;
      });
      // console.log(result);
      // return;
      // в новый массив без пустых ячеек
      let newArr = [];
      i = 0;
      result.map((row) => {
        let newRow = row.filter((item) => {
          return item.timestamp || item.time;
        })
        if (newRow.length) {
          newArr.push(newRow);
        }
      });
      // this.tableAdmin = newArr.slice(); // независимая копия
      // console.log(newArr)
      // проверим соответствие введенных данных регулярке
      /*const inputPattern = /^([0-1][0-9]|[2][0-3]):([0-5][0-9]) - ([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
      let errFlag = false;
      idArr.map((id) => {
        let el = document.getElementById(id);
        let val = el.innerText;
        if(val){
          if (!inputPattern.test(val)) {
            el.style.border = '3px solid red';
            errFlag = true;
          }else{
            el.style.border = '1px solid blue';
          }
        }
      })
      if(errFlag){
        this.isOk = false;
        this.statusText = 'Вводите время работы по шаблону 08:00[пробел]-[пробел] 09:00';
        return;
      }*/
      if (!this.isOk) return;
      // массив готов отправлчем
      let url = '/api/save';
      let response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: "application/json",
          Authorization: this.tokenType + ' ' + this.token
        },
        body: JSON.stringify({days: newArr})
      });
      if (response.ok) {
        let result = await response.json();
        this.table = result.data;
        this.tableAdmin = this.table.slice(); // независимая копия
      } else {
        console.log('Error');
        console.log(response);
      }
    }
  },
  mounted() {
    this.token = localStorage.getItem('access_token');
    this.tokenType = localStorage.getItem('token_type');
    this.getTableData();
  },
  watch: {
    table: {
      handler() {
        if (this.table.length) {
          console.log(this.table)
          for (let i = 0; i < this.table.length; i++) {
            // this.picked[i] = this.table[i][0];
            this.picked[i] = new Date(this.table[i][0].timestamp);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.day {
  border: none !important;
  font-weight: bold;
}

.data-td {
  padding: .5em;
  border: 1px solid #999;
}

.data-h {
  font-weight: bold;
  padding-right: 1em;
}

.passive{
  background: #ddd;
  color: #fff;
}

.cursor {
  cursor: pointer;
}

.selected {
  background: green;
  color: #fff;
  font-weight: bold;
}

.add {
  color: blue;
}

.del {
  color: red;
}
</style>
