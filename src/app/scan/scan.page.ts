import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {Camera} from '@ionic-native/camera/ngx';
import Tesseract from 'tesseract.js';
import {ActionSheetController} from '@ionic/angular';

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
    public scanDone = false;

    constructor(private camera: Camera,
                public progress: NgProgress, private router: Router,
                public actionSheetCtrl: ActionSheetController) {

        const host = window.location.protocol + '//'
            + window.location.hostname
            + (window.location.port ? ':' + window.location.port : '')
            + '/';
        this.tesseract = Tesseract.create({
            workerPath: host + 'assets/lib/worker.js',
            langPath: host + 'assets/lib/',
            corePath: host + 'assets/lib/tesseract-core.js',
        });
        console.log(host + 'assets/lib/worker.js');
        this.tesseractConfig = {
            // If you want to set the language explicitly:
            lang: 'fra',
            // You can play around with half-documented options:
            // tessedit_char_whitelist: ' 0123456789',
        };
    }

    async selectSource() {
        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Use Library',
                    handler: () => {
                        this.goToBill(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }, {
                    text: 'Capture Image',
                    handler: async () => {
                        this.goToBill(this.camera.PictureSourceType.CAMERA);
                    }
                }, {
                    text: 'Mock',
                    handler: async () => {
                        this.mockValue();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    private mockValue() {
        this.imageText = 'Recette :' +
            '1 happy meal 2.5 €' +
            '2 big mac 3.5 €' +
            'Total 6 €';
        this.scanDone = true;
    }

    async goToBill(source) {
        await this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            allowEdit: true,
            saveToPhotoAlbum: false,
            // sourceType: this.camera.PictureSourceType.CAMERA,
            sourceType: source,
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
                recognizedText => {
                    this.imageText = recognizedText.text;
                    this.scanDone = true;
                },
            );
    }

    validate() {
        this.router.navigateByUrl(`validate-bill?inputText=${this.imageText}`);
    }

    ngOnInit(): void {
    }

}
