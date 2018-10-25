import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {Camera} from '@ionic-native/camera/ngx';
import Tesseract from 'tesseract.js';

@Component({
    selector: 'app-scan',
    templateUrl: './scan.page.html',
    styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

    selectedImage: string;
    imageText = 'Prenez une photo !';
    tesseract: Tesseract;
    tesseractConfig;

    constructor(private camera: Camera,
                public progress: NgProgress, private router: Router) {

        const host = window.location.protocol + '//'
            + window.location.hostname
            + (window.location.port ? ':' + window.location.port : '')
            + '/';
        this.tesseract = Tesseract.create({
            workerPath: host + 'assets/lib/worker.js',
            langPath: host + 'assets/lib/',
            corePath: host + 'assets/lib/tesseract-core.js',
        });
        console.log( host + 'assets/lib/worker.js');
        this.tesseractConfig = {
            // If you want to set the language explicitly:
            lang: 'fra',
            // You can play around with half-documented options:
            // tessedit_char_whitelist: ' 0123456789',
        };
    }

    /*selectSource() {
        const actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Use Library',
                    handler: () => {
                        this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }, {
                    text: 'Capture Image',
                    handler: () => {
                        this.getPicture(this.camera.PictureSourceType.CAMERA);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    getPicture(sourceType: PictureSourceType) {
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then((imageData) => {
            this.selectedImage = `data:image/jpeg;base64,${imageData}`;
        });
    }

    recognizeImage() {
        Tesseract.recognize(this.selectedImage)
            .progress(message => {
                if (message.status === 'recognizing text')
                    this.progress.set(message.progress);
            })
            .catch(err => console.error(err))
            .then(result => {
                this.imageText = result.text;
            })
            .finally(resultOrError => {
                this.progress.complete();
            });
    }*/
    goToBill() {
        this.camera.getPicture({
                   quality: 100,
                   destinationType: this.camera.DestinationType.DATA_URL,
                   allowEdit: true,
                   saveToPhotoAlbum: false,
                   sourceType: this.camera.PictureSourceType.CAMERA,
                   correctOrientation: true
               }).then((imageData) => {
                   this.imageText = 'Photo prises ! Veuillez patienter';
                   this.selectedImage = `data:image/jpeg;base64,${imageData}`;
                   this.imageText = 'Step 1';
               });
    }

    recognizeImage() {
        const imageTest = this.selectedImage;
        this.imageText = 'Step 2';
        this.tesseract.recognize(imageTest, this.tesseractConfig)
            .progress((v) => this.imageText = v.status)
            .catch((e) => this.imageText = 'Erreur : ' + e)
            .then(
                recognizedText =>
                    this.imageText = recognizedText.text,
            );
    }

    ngOnInit(): void {
    }

}
