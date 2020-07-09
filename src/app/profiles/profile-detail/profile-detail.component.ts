import { TokenService } from './../../core/shared/token.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {

  public user: User;
  public userNick: string;

  public image;

  constructor( private auth: AngularFireAuth, private tokenService: TokenService) { }
  ngOnDestroy(): void {
    this.setNickName(this.userNick)
  }

  ngOnInit() {
    this.getUser();
  }

  public getUser(): void {
    this.auth.user.subscribe(user => {
      this.user = user as User;
      if (!!this.user.uid) {
        this.getNickName();
        this.getUserImage();
       }
     });
  }

  public setNickName(nick: string): void {
    this.tokenService.setToken(this.user.uid, nick);
  }

  public getNickName(): void {
    let nick = this.tokenService.getToken(this.user.uid);
    this.userNick = nick;
  }

  public getUserImage():void {
    let image = this.tokenService.getToken(`image-${this.user.uid}`);
    this.image = image;
  }


  public removeImage(): void {
    this.tokenService.removeToken(`image-${this.user.uid}`);
    this.image = null;
  }

  public changeListener($event) : void {
    this.readImage($event.target);
  }

  public readImage(inputValue: any): void {
    var file:File = inputValue.files[0];
    var fileReader:FileReader = new FileReader()  ;
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      fileReader.onloadend = (e) => {
        this.image = fileReader.result;
        this.tokenService.setToken(`image-${this.user.uid}` , fileReader.result );
      }
      fileReader.readAsDataURL(file);
    } else {
      alert("Selecione uma imagem JPG ou PNG")
      return;
    }
  }

}
