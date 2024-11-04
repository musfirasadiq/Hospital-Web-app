import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryImages = [
    { url: 'assets/images/img 1.jpg' },  // Changed to a relative path from 'assets'
    { url: 'assets/images/img3.jpg' },
    { url: 'assets/images/img2.jpg' },
    {url : 'assets/images/img 5.jpg'},
    {url : 'assets/images/img6.jpg'},
    {url : 'assets/images/img 7.jpg'},
    

    // Add more image URLs as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
