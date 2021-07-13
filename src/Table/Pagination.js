import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import { getAPI } from '../Services/getAPI';

class Pagination extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            PageNumber:1,
            pageCount:0,
            pageSize:5,
            data:[]
        }
    }
    getUserList =() =>{
        const {pageSize, PageNumber} = this.state;
        getAPI(`users?page=${PageNumber}&per_page=${pageSize}`).then(res =>{
          console.log(res)
          let page = res.total;
         this.setState({
             data:res.data,
             pageCount:page/pageSize
         })
        })
    
      }
      handlePageClick = (data) => {
        let selected = data.selected + 1;
        let PageNumber = selected;
    
        this.setState({ PageNumber: PageNumber }, () => {
          this.getUserList();
        });
      };
    componentDidMount(){
this.getUserList();
    }
    
    render() {
        const {pageCount, data} = this.state;
        return (
            <div>
              <h2>User list from api with pagination</h2>

<table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last name</th>
                        <th>Email</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ?
                        (data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No users</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="paginationData">
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              /></div>   
            </div>
        )
    }
}

export default Pagination
