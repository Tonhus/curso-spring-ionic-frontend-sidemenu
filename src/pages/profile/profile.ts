import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageBucketService } from './../../services/image-bucket.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;
  private _READER: any = new FileReader();

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public imageBucketService: ImageBucketService,
    public formBuilder: FormBuilder,
    private camera: Camera) {
    this.formGroup = formBuilder.group({
      file: [, [Validators.required]]
    });
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
    this.imageBucketService.loadImageUrl(this.cliente, this.imageBucketService.profilePrefix);
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo
      this.picture = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      // Handle error console.log("Camera issue: " + err);
    });
    this.cameraOn = false;
  }

  readUrl(event) {
    this.handleImageSelection(event).subscribe(
      response => {
        this.picture = response;
      },
      error => { }
    );

  }

  handleImageSelection(event: any): Observable<any> {
    let file: any = event.target.files[0];

    this._READER.readAsDataURL(file);
    return Observable.create((observer) => {
      this._READER.onloadend = () => {
        observer.next(this._READER.result);
        observer.complete();
      }
    });
  }

}
