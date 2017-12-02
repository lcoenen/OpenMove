import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Input, OnChanges, SimpleChange } from '@angular/core';

/**
 * Generated class for the OfferridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';

import { AddressModalPage } from '../address-modal/address-modal'; 

enum PayementPhilosophy {

FREE,
PART,
REFUNDED, 
PAID

}

@IonicPage()
@Component({
  selector: 'page-offerride',
  templateUrl: 'offerride.html',
})
export class OfferRidePage  {

  public philosophy: PayementPhilosophy;

  private _destination: string;
  private _origin: string;
  private _riding_time: string;
  private _payement: string;

  private _next: boolean;

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
	public modalCtrl: ModalController) {
    this.philosophy = 0
    this._next = false;
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
    console.log('ionViewDidLoad OfferridePage');

  }

  @ViewChild(Slides) slides: Slides;

  previous() {
  
    this.slides.slidePrev();

    this.refresh_allow_next()

  }

  next() { 

    this.slides.slideNext();

    this.refresh_allow_next()

  }

  isFirst(){

    return this.slides.isBeginning()

  }


  isLast(){

    return !this._next || this.slides.isEnd()

  }

  isValid(){
  
    return this.slides.isEnd()
  
  }

  refresh_allow_next(){

    let page = this.slides.getActiveIndex() 

    const relevant_vars: string[] = [
      'destination',
      'origin',
      'riding_time',
      'payement'
    ]

    console.log(relevant_vars[page]);
    console.log(this[relevant_vars[page]]);
    
    let allow_next: boolean = this[relevant_vars[page]] != undefined;

    this._next = allow_next;
    this.slides.lockSwipeToNext(!allow_next) 
    console.log('this._next', this._next);

  }

  address_modal(){

    console.log('Address modal')

  }

  set destination(theDestination: string){

    if(theDestination == 'address'){

      let addressModal = this.modalCtrl.create(AddressModalPage);
      addressModal.present();

    }

    this._destination = theDestination
    this.refresh_allow_next()

  }

  get destination(): string {

    return this._destination

  }

  set origin(theOrigin: string){

    this._origin = theOrigin
    this.refresh_allow_next()

  }

  get origin(): string {

    return this._origin

  }

  set riding_time(theRidingTime: string){

    this._riding_time = theRidingTime
    this.refresh_allow_next()

  }

  get riding_time(): string {

    return this._riding_time

  }


  set payement(thePayement: string){

    this._payement = thePayement
    this.refresh_allow_next()


    const _boundaries = {
     
      10: PayementPhilosophy.FREE,
      40: PayementPhilosophy.PART,
      60: PayementPhilosophy.REFUNDED,
      80: PayementPhilosophy.PAID
      
    }
    
    for (let i in _boundaries) {

      let boundary = _boundaries[i];
      
      if(thePayement > i)
        this.philosophy = boundary;

    }

  }

  get payement(): string {

    return this._payement

  }

}
