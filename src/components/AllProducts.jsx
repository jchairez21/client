import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'


const AllProducts = (props) => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [surface, setSurface] = useState(0)
    const [loaded, setLoaded] = useState(false);
    const [product, setProduct] = useState("")


    useEffect(() => {
        axios.get("http://localhost:8000/api/product")
            .then(res => {
                console.log(res.data.products)
                setData(res.data.products)
            })
            .catch(err => console.log(err))

    }, [surface])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, price, description);

        const newProduct = {
            title: title,
            price: price,
            description: description
        }
        axios.post("http://localhost:8000/api/product", newProduct)
            .then(res => {
                console.log(res.data)
                const newSurface = surface + 1
                setSurface(newSurface)
            })
            .catch(err => console.log(err))

    }
    const deleteProduct = (id) => {
        axios.delete('http://localhost:8000/api/product/' + id)
            .then(res => {
                removeFromDom(id)
            })
            .catch(err => console.error(err));
    }

    const removeFromDom = id => {
        setData(data.filter(product => product._id != id));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>
                    Title: <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                </p>
                <p>
                    Price: <input type="number" min="5" onChange={(e) => setPrice(e.target.value)} value={price} />
                </p>
                <p>
                    Description: <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                </p>
                <button>Create</button>
            </form>
            <hr />
            <h2>All Products:</h2>
            {
                data.map((product, i) => {
                    return (
                        <div key={product._id}>
                            <Link to={"/" + product._id}>{product.title}</Link>
                            <br />
                            <Link to={"/view/" + product._id + "/edit"}>
                                Edit
                            </Link>
                            <button onClick={(e) => { deleteProduct(product._id) }}>
                                Delete
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllProducts
