export default class GotService {

	constructor() {
		this._apiBase = "https://www.anapioficeandfire.com/api";
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
	
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}
		
		return await res.json();
	};
	getAllCharacters = async () => {
        const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
	}
	
    getAllHouses = async () => {
		const res = await this.getResource("/houses?page=5&pageSize=10");
        return res.map(this._transformHouse);
	}
	
	getHouse = async (id) => {
		const house = await this.getResource(`/houses/${id}`);
		return this._transformHouse(house);
	}

    getAllBooks = async () => {
		const res = await this.getResource("/books?page=1&pageSize=10");
		return res.map(this._transformBook);
	}
	getBook = async (id) => {
		const book = await this.getResource(`/books/${id}`);
		return this._transformBook(book);
	}

    _transformCharacter = (char) => {

		for (let i in char) {
			if (char[i] === "" || char[i] === null) {
				char[i] = "no data";
			}
		}

		let {name, gender, born, died, culture} = char;
		const ans = char.url;
		const reg = /\d/g;
		const find = ans.match(reg);
		let id = "";

		let newArr = () => {		
			for (let i = 0; i < find.length; i++) {
				id += find[i];
			}
			return id
		}

		id = newArr();

        return {
            name: name,
            gender: gender,
            born: born,
            died: died,
            culture: culture,
			id: id	
        }
    }

	_transformHouse = (house) => {

		for (let i in house) {
			if (house[i] === "" || house[i] === null) {
				house[i] = "no data";
			}
		}

		const ans = house.url;
		const reg = /\d/g;
		const find = ans.match(reg);
		let id = "";

		let newArr = () => {		
			for (let i = 0; i < find.length; i++) {
				id += find[i];
			}
			return id
		}

		id = newArr();

        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons,
			id: id
        }
    }

	_transformBook = (book) => {

		for (let i in book) {
			if (book[i] === "" || book[i] === null) {
				book[i] = "no data";
			}
		}

		const ans = book.url;
		const reg = /\d/g;
		const find = ans.match(reg);
		let id = "";

		let newArr = () => {		
			for (let i = 0; i < find.length; i++) {
				id += find[i];
			}
			return id
		}

		id = newArr();

        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
			id: id
        }
	}
}


