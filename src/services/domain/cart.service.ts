import { ProdutoDTO } from './../../models/produto.dto';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { Cart } from '../../models/cart';

@Injectable()
export class CartService {
    constructor(public storage: StorageService) {
    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            return this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let possition = cart.items.findIndex(x => x.produto.id == produto.id);
        if (possition == -1) {
            cart.items.push({ quantidade: 1, produto: produto })
        } else {
            cart.items[possition].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let possition = cart.items.findIndex(x => x.produto.id == produto.id);
        if (possition != -1) {
            cart.items.splice(possition, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        console.log();
        let possition = cart.items.findIndex(x => x.produto.id == produto.id);
        if (possition != -1) {
            cart.items[possition].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let possition = cart.items.findIndex(x => x.produto.id == produto.id);
        if (possition != -1) {
            cart.items[possition].quantidade--;
            if (cart.items[possition].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.getCart();
        let sum = 0;
        cart.items.forEach(x => sum += x.quantidade * x.produto.preco);
        return sum;
    }

}