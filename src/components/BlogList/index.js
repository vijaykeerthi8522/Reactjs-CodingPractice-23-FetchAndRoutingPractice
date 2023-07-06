import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_url,
      topic: eachItem.topic,
    }))
    // console.log(updatedData)

    this.setState({
      blogsData: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {blogsData, isLoading} = this.state
    // console.log(blogsData[0])

    return (
      <div className="blog-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          blogsData.map(eachItem => (
            <BlogItem key={eachItem.id} blogDetails={eachItem} />
          ))
        )}
      </div>
    )
  }
}

export default BlogList
