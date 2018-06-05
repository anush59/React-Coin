import React from 'react';
import './Search.css';
import {API_URL} from '../../config';
import { handleResponse } from '../../helper';
import Loading from './Loading';
import {withRouter} from 'react-router-dom';

class Search extends React.Component{
    constructor(){
        super();
        this.handleChange=this.handleChange.bind(this);
        this.handleRedirect=this.handleRedirect.bind(this);
        this.state={
            searchQuery: '',
            loading:false,
            searchResults:[],
        }
    }
    handleChange(event){
        const searchQuery= event.target.value;
        this.setState({  searchQuery })
        //if searchQuery is not present don't send request to server
        if(!searchQuery){
            return ''
        }
        this.setState({loading:true})
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then((result) => {
                this.setState({
                    loading:false,
                    searchResults:result,
                })
            })
    }
    handleRedirect(currencyId){
        //clear input value and close autocomplite container, by clearing searchQuery state
        this.setState({
            searchQuery:'',
            searchResults:[],
        })
        this.props.history.push(`/currency/${currencyId}`)
    }
    renderSearchResults(){
        const {searchResults,searchQuery,loading} = this.state;
        if(!searchQuery){
            return '';
        }

        if (searchResults.length>0){
            return(
                <div className='Search-result-container'>
                    {
                        searchResults.map(result=>(
                            <div 
                                key = {result.id} 
                                className='Search-result' 
                                onClick={()=>this.handleRedirect(result.id)}
                            >
                                {result.name} ({result.symbol})
                            </div>
                        ))
                    }
                </div>
            )

        }
        if(!loading){
                return(
                <div className='Search-result-container'>
                    <div className='Search-no-result'>
                        No results found.       
                    </div>
                </div>
            )
        }
    }
    render(){
        const {loading, searchQuery} = this.state;
        return(
            <div className='Search'>
                <span 
                    className='Search-icon'>
                </span>
                <input 
                    onChange={this.handleChange} 
                    className='Search-input'
                    type='text'
                    placeholder='Currency name'
                    value={searchQuery}
                />
                { loading &&
                    <div className='Search-loading'>
                        <Loading width='12px' height='12px' />
                    </div>
                }
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search);