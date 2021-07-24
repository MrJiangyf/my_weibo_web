import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
  {
    title: '博客首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '笔记分类',
    icon: 'laptop',
    key: '/home/general',
    subs: [
      {key: '/home/general/js', title: 'JavaScript基本功', icon: '',},
      {key: '/home/general/vue', title: 'vue相关', icon: '',},
      {key: '/home/general/react', title: 'react相关', icon: '',},
    ]
  },
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav
