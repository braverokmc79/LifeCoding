
import { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        // console.log("====>TOC render shouldComponentUpdate ", newProps, this.props.data);
        //1) render() 이전에 shouldComponentUpdate 실행된다.
        //2)shouldComponentUpdate return 값이 true 면 render() 호출 되고 false 면 호출 되지 않는다.
        //3) 데이터 추가시 shouldComponentUpdate(newProps, newState) 
        //this.props.data; 현재값 이고, newProps 추가된 값이다.

        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }

    render() {
        console.log("TOC render");
        let lists = [];
        const data = this.props.data;
        let i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}><a href={"/content/" + data[i].id}
                    data-id={data[i].id}
                    onClick={function (id, e) {
                        e.preventDefault();
                        //const id = e.target.dataset.id;
                        // console.log("id : ", id);
                        this.props.onChangePage(id);
                        //bind 에 파라미터 값을 추가하면 this event 값은 한칸씩 뒤로 밀린다.
                    }.bind(this, data[i].id)}
                >{data[i].title}</a></li>
            );
            i = i + 1;
        }

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}


export default TOC;