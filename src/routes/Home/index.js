import React from 'react'
import {Carousel} from 'antd'
import './style.css'

import {getBlogListInter} from "../../api/blog.js";
import {getEnumsInter} from "../../api/blog";

const imgs = [
  'http://47.99.130.140/imgs/wallhaven-p8r1e9.jpg',
  'http://47.99.130.140/imgs/wallhaven-e7zyy8.jpg',
  'http://47.99.130.140/imgs/wallhaven-6k9e7q.jpg',
  'http://47.99.130.140/imgs/photo.jpg',
];


class Home extends React.Component {
  state = {
    blogList: []
  };

  componentDidMount() {
    //获取博客类型枚举值
    getBlogListInter().then(res => {
      if(res && res.code == 200) {
        this.setState({
          blogList: res.data.blogList
        })
      }
    })
  }

  render() {

    const blogHtml = (
        this.state.blogList.map((item, index) => {
          return (
              <div className="item-wrapper" key={index}>
                <img className="photo" src={item.user.picture}/>
                <div className="list-box">
                  <div className="content">
                    <label className='light-title'>{item.user.nickName}：</label>
                    <span>{item.content}</span>
                  </div>
                  <div className="date-time">{item.createdAtFormat}</div>
                </div>
                <img className="content-image" src={item.image}/>
              </div>
          )
        })
    );

    return (
      <div style={styles.bg} className='home'>
          <Carousel arrows effect='fade' className='size'>
            {imgs.map(item=><div key={item}><div className='size' style={{backgroundImage:`url(${item})`}}/></div>)}
            {/*不用img标签是因为图片大小会出现问题*/}
          </Carousel>

          <div className="weibo-content-box">
              <div id="container-weibo-list" className="weibo-list">
                  {blogHtml}
              </div>
              <div className="weibo-focus">

              </div>
          </div>
      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'calc(100vh - 64px)'
  }
}

export default Home
