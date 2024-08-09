import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios"
function BlogListing() {

  let DeleteBlog = async (id) => {
    try {
      await axios.delete(`https://65c8dadaa4fbc162e1124bb4.mockapi.io/employee/${id}`)
      alert("Deleted")
      getData()
    } catch (error) {
      console.log(error)
    }
  }
  const [blogList, setblogList] = useState([])
  let getData = async () => {
    try {
      const blogs = await axios.get("https://65c8dadaa4fbc162e1124bb4.mockapi.io/employee");
      setblogList(blogs.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid">


      <h1 className="h3 mb-2 text-gray-800 font-weight-bold">UserData</h1>

      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <p className="mb-4">Fill your details in the required space </p>
        <Link to="/portal/create-blog" className="d-none d-sm-inline-block btn btn-sm btn-warning text-dark">New user</Link>
      </div>




      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTable</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Address</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  blogList.map((blog, index) => {
                    return (
                      <tr key={index}>
                        <td>{blog.title}</td>
                        <td>{blog.content}</td>
                        <td>{blog.mail}</td>
                        <td>{blog.address}</td>

                        <td>
                          <Link to={`/portal/edit-blog/${blog.id}`} className='btn btn-info'>Edit</Link>

                        </td>
                        <td>
                          <button onClick={() => DeleteBlog(blog.id)} className='btn btn-danger'>Delete</button>
                        </td>

                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BlogListing