const path = './dbjson/cartsDb.json'

class CartManagerFs {
    constructor() {
        this.path
    }

    readCart = async () => {
        try {
            const cartsJson = await fs.promises.readFile(path, 'utf-8')
            const cartsJs = JSON.parse(cartsJson)
            return cartsJs
        } catch (error) {
            return []
        }
    }


    createCart = async () => { }
    getCartById = async () => { }
    createProductToCart = async () => { }

}

