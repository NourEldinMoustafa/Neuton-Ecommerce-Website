import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';
import { SliderModule } from 'primeng/slider';
import { TreeModule } from 'primeng/tree';
@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss'],
})
export class FilterCategoryComponent {
  constructor(private _ProductsService: ProductsService) {}

  @Output() priceEmitter = new EventEmitter<any>() ;
  @Output() catEmitter = new EventEmitter<any>();

  products: any[] = [];
  crslProducts: any[] = [];
  responsiveOptions: any[] = [];

  allCats: any[] = [];
  rangeValues: number[] = [0, 10000];
  curruntCat: any = -1;
  ngOnInit() {
    this.getAllCats();

    this.getAllProducts();

    this.filterationClicked();

    this._ProductsService.allProducts().subscribe((products) => {
      this.crslProducts = products;
    });

    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ];
  }

 
  filterPrice(rangeValues: any) {
    // this.priceEmitter.emit(rangeValues);
    // this.filterByPrice(this.curruntCat, rangeValues[0], rangeValues[1]);
    this.priceEmitter.emit([rangeValues[0],rangeValues[1],this.curruntCat]);
    console.log('this.products : ',this.products)
    console.log('this.filterProductsByPrice : ',this.filterProductsByPrice(this.products,rangeValues[0],rangeValues[1]))
    this.catEmitter.emit(this.filterProductsByPrice(this.products,rangeValues[0],rangeValues[1]));
    // this.catEmitter.emit(this.products.splice(0,1));
  }



  filterProductsByPrice(products: any[], minPrice: number, maxPrice: number):any[] {
    return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  }


  filterByPrice(catId: any, minPrice: any, maxPrice: any) {
    if (catId == -1) {
      this.getAllProducts();
    } else {
      this._ProductsService
        .productsByPrice(catId, minPrice, maxPrice)
        .subscribe((res) => {
          console.log('productsByPrice : ', res);
          this.catEmitter.emit(res);
        });
    }
    console.log(catId);
  }

  filterCat(catId: any) {
    if (catId == -1) {
      this.getAllProducts();
    } else {
      this._ProductsService.productsByCategory(catId).subscribe((res) => {
        console.log('from filter-category : ', res);
        this.catEmitter.emit(res);
        this.products = res
      });
    }
    this.curruntCat = catId;
  }

  getAllCats() {
    this._ProductsService.getAllCategories().subscribe((res) => {
      this.allCats = res;
      this.catEmitter.emit(res);
      this.products = res
      console.log(this.allCats);
    });
  }

  getAllProducts() {
    this._ProductsService.allProducts().subscribe((res) => {
      console.log('from filter-category : ', res);
      this.catEmitter.emit(res);
      this.products = res
    });
  }

  filterationClicked() {
    const selectCat = document.querySelector('.select-cat');
    const caretCat = document.querySelector('.caret-cat');
    const menu = document.querySelector('.menu');
    selectCat?.addEventListener('click', () => {
      caretCat?.classList.toggle('caret-rotate');
      menu?.classList.toggle('menu-open');
    });

    const selectPric = document.querySelector('.select-price');
    const caretPric = document.querySelector('.caret-price');
    const range = document.querySelector('.range');
    selectPric?.addEventListener('click', () => {
      caretPric?.classList.toggle('caret-rotate');
      range?.classList.toggle('range-open');
    });
  }
}
