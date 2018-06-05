import React from 'react';
import {API_URL} from '../../config';
import {handleResponse,changePercent} from '../../helper';
import './Detail.css';
import Loading from '../common/Loading';



class Detail extends React.Component{
    constructor(){
        super();
        this.state = {
            currency:{},
            loading:false,
            error:null,
        }
    }
    componentDidMount(){
        const currencyId = this.props.match.params.id;
        this.fetchCurrency(currencyId);
    }

    
    componentWillReceiveProps(nextprops){
        if(this.props.location.pathname !== nextprops.location.pathname){
            //get new currency id from URL
            const newCurrencyId = nextprops.match.params.id
            this.fetchCurrency(newCurrencyId);
        }
    }


    fetchCurrency(currencyId){
        this.setState({loading:true})

        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then((currency)=>{
                this.setState({
                    loading:false,
                    error:null,
                    currency,
                })
            })
            .catch((error)=>{
                this.setState({
                    loading:false,
                    error:error.errorMessage,
                })
            })
    }


    render(){
        const {loading,error,currency} = this.state;

        //render loading component only if loading state is set to true
        if (loading) {
            return(
                <div className = 'loading-container'>
                    <Loading />
                </div>
            )
        } 
        //render error message only if error required while fetching data
        if(error){
            return(
                <div className='error'>
                    {error}
                </div>
            )
        }
        return(
            <div className='Detail'>
                <h1 className='Detail-heading'>
                    {currency.name} ({currency.symbol})
                </h1>
                <div className='Detail-container'>
                    <div className='Detail-item'>
                        Price <span className='Detail-value'>$ {currency.price}</span>
                    </div>
                    <div className='Detail-item'>
                        Rank <span className='Detail-value'>{currency.rank}</span>
                    </div>
                    <div className='Detail-item'>
                        24h Change <span className='Detail-value'>{changePercent(currency.percentChange24h)}</span>
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>Market Cap</span>
                        <span className='Detail-dollar'>$</span>
                        {currency.marketCap}
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>24h Volume</span>
                        <span className='Detail-dollar'>$</span>
                        {currency.volume24h}
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>Total supply</span>
                        {currency.totalSupply}
                    </div>
                </div>
            </div>
        )
    }
}


export default Detail; 