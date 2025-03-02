import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('videoPlayer') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.video.nativeElement.muted = true; // Garante que o vídeo está mudo
    this.video.nativeElement.play().catch(error => console.error('Erro ao dar play:', error));
  }
}
