import React, { useState } from 'react';
import axios from 'axios';


const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://${process.env.REACT_APP_HOST_ADDRESS}:4000/create`, {
            title
        })
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;
