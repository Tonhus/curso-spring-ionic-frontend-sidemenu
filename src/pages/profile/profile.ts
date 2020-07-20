import { ImageBucketService } from './../../services/image-bucket.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public imageBucketService: ImageBucketService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      // this.email = localUser.email;
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage')
            }
          })
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  getImageIfExists() {
    this.imageBucketService.loadImageUrl(this.cliente,this.imageBucketService.profilePrefix);
  }

}
