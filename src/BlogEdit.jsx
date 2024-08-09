import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from "axios"

function BlogEdit() {
  const params = useParams();
  let [Blog, setBlog] = useState({})

  const { handleSubmit, setValues, values, handleChange } = useFormik({
    initialValues: {
      title: "",
      content: "",
      mail: "",
      address: ""
    },

    validate: (values) => {
      console.log(values);
    },
    onSubmit: async (values) => {
      try {
        const blogResp = await axios.put(`https://65c8dadaa4fbc162e1124bb4.mockapi.io/employee/${params.id}`, values)
        alert("Edited");
        setBlog(blogResp.data);
        getBlog()
      } catch (error) {
        console.log(error);
      }
    }
  })



  let getBlog = async () => {
    try {
      const blogResp = await axios.get(`https://65c8dadaa4fbc162e1124bb4.mockapi.io/employee/${params.id}`)
      setValues({
        title: blogResp.data.title,
        content: blogResp.data.content,
        mail: blogResp.data.mail,
        address: blogResp.data.address
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlog()
  }, [])
  return (


    <div className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='p-6'>
            <h1 className='h4 text-gray-900 mb-4 font-weight-bold'>Edit</h1>
          </div>



          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type='text'
                name='title'
                value={values.title}
                onChange={handleChange}
                className="form-control form-control-user"
                id="exampleFirstName"
                placeholder='Name' />
            </div>
            <div className='form-group'>
              <textarea className="form-control form-control-user"
                name='content'
                value={values.content}
                onChange={handleChange}
                id="exampleFirstDescription"
                placeholder='Username'></textarea>
            </div>
            <div className='form-group'>
              <input type='text'
                name='mail'
                value={values.mail}
                onChange={handleChange}
                className="form-control form-control-user"
                id="exampleFirstName"
                placeholder='E-mail' />
            </div>
            <div className='form-group'>
              <textarea className="form-control form-control-user"
                name='address'
                value={values.address}
                onChange={handleChange}
                id="exampleFirstDescription"
                placeholder='address'></textarea>
            </div>
            <div className='form-group'>
              <input type='submit' className='btn btn-success ' value={"Update"}  />
            </div>
            
          </form>


        </div>
      </div>
    </div>
  )
}

export default BlogEdit