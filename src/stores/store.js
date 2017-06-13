import { observable, computed, action } from 'mobx';

export default class{
  @observable notTitle = "";
  @observable notBody = "";

  @action setTitle = (val) => this.notTitle = val;
  @action setBody = (val) => this.notBody = val;
}
