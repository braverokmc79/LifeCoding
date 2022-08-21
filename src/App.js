import './App.css';
import { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {

  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "create",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "www!" },
      welcome: { title: "welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "1.HTML", desc: "HTML is for information" },
        { id: 2, title: "2.CSS", desc: "CSS is for design" },
        { id: 3, title: "3.javaScript", desc: "javaScript is for interactive" },
      ]
    }
  }

  getReadContent() {
    return this.state.contents.filter(item => {
      return this.state.selected_content_id === item.id
    })[0];
  }

  getContent() {
    let _title, _desc, _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />
    } else if (this.state.mode === "read") {

      const _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />


    } else if (this.state.mode === "create") {
      _article = <CreateContent
        onSubmit={function (_title, _desc) {
          //add content to this.state.contents
          console.log("자식컴포넌트 CreateContent 데이터 받기 : ", _title, _desc);

          this.max_content_id = this.max_content_id + 1;

          const _contents = this.state.contents.concat(
            { id: this.max_content_id, title: _title, desc: _desc }
          );

          this.setState({
            contents: _contents,
            mode: 'read',
            selected_content_id: this.max_content_id
          });

        }.bind(this)
        }
      />
    } else if (this.state.mode === "update") {
      const _content = this.getReadContent();
      _article = <UpdateContent data={_content}

        onSubmit={
          function (_id, _title, _desc) {

            //map 은 깊은 복사 가능
            const _contents = this.state.contents.map((item) => {
              if (item.id === _id) {
                return { id: _id, title: _title, desc: _desc };
              } else return item;
            });
            this.setState({ contents: _contents, mode: "read" });

          }.bind(this)
        }
      />
    }

    return _article;
  }


  render() {
    // console.log("App render");

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage1={function () {
            //alert("hihihi1");
            this.setState({
              mode: "welcome"
            })
          }.bind(this)}
        />
        <TOC onChangePage={function (id) {
          //console.log("event :", id);
          this.setState({
            mode: "read",
            selected_content_id: Number(id)
          });

        }.bind(this)} data={this.state.contents} />


        <Control
          onChangeMode={function (_mode) {

            if (_mode === "delete") {
              

            } else {
              this.setState({ mode: _mode });
            }

          }.bind(this)}
        />


        {this.getContent()}

      </div >
    );
  }
}

export default App;
