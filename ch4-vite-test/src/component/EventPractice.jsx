
import React, { Component } from 'react';

class EventPractice extends Component {
    //추가1
    state = {
        message: ''
    };

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <h2>message : {this.state.message}</h2>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    //추가2,
                    value={this.state.message}
                    //추가3
                    onChange={(e) => {
                        //추가3-2, 이부분 가장 중요함.
                        this.setState({
                            message: e.target.value
                        });
                    }}
                />
            </div>
        );
    }
}

export default EventPractice;