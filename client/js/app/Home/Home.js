import React from 'react';
import axios from 'src/common/myAxios';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counters: [],
        };

        this.newCounter = this.newCounter.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.deleteCounter = this.deleteCounter.bind(this);

        this._modifyCounter = this._modifyCounter.bind(this);
    }

    componentDidMount() {
        axios.get('/api/counters').then((res) => {
            this.setState({
                counters: res.data,
            });
        });
    }

    newCounter() {
        axios.post('/api/counters').then((res) => {
            const data = this.state.counters;
            data.push(res.data);

            this.setState({
                counters: data,
            });
        });
    }

    incrementCounter(index) {
        const id = this.state.counters[index]._id;

        axios.put(`/api/counters/${id}/increment`).then((res) => {
            this._modifyCounter(index, res.data);
        });
    }

    decrementCounter(index) {
        const id = this.state.counters[index]._id;

        axios.put(`/api/counters/${id}/decrement`).then((res) => {
            this._modifyCounter(index, res.data);
        });
    }

    deleteCounter(index) {
        const id = this.state.counters[index]._id;

        axios.delete(`/api/counters/${id}`).then(() => {
            this._modifyCounter(index, null);
        });
    }

    _modifyCounter(index, data) {
        const prevData = this.state.counters;

        if (data) {
            prevData[index] = data;
        } else {
            prevData.splice(index, 1);
        }

        this.setState({
            counters: prevData,
        });
    }

    render() {
        return (
            <div>
                <p>Counters:</p>

                <ul>
                    {this.state.counters.map((counter, i) => (
                        <li key={i}>
                            <span>{counter.count} </span>
                            <button onClick={() => this.incrementCounter(i)}>+</button>
                            <button onClick={() => this.decrementCounter(i)}>-</button>
                            <button onClick={() => this.deleteCounter(i)}>x</button>
                        </li>
                    ))}
                </ul>

                <button onClick={this.newCounter}>New counter</button>
            </div>
        );
    }
}

export default Home;
