import React from 'react';
import './StateCard.css'
import { TIMELINE_STAT } from '../../actions'
function CardData() {
    const rtn = [{
        title: "Total",
        key: 'total'
    }, {
        title: "Delta",
        key: 'delta'
    }, {
        title: "Delta 7",
        key: 'delta7'
    }]
    return rtn;
}

class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleDisChange = (e, stateData) => {
        this.setState({ select: e.target.value === 'Select' ? false : { [stateData[0]]: e.target.value } })
    }

    statsRender = () => {

    }
    render() {
        const cardData = CardData();
        const stateData = this.props.data

        return (
            <>
                {
                    cardData.map((card, i) => {
                        return (
                            <>
                                <div className="card" id="card" style={this.props.cardStyle} key={i}>
                                    <p className="title">{stateData[0]} <span><label>
                                        <select className="district" onChange={(e) => { this.handleDisChange(e, stateData) }}>
                                            <option value='Select'>Select District</option>
                                            {stateData[1]['districts'] ? Object.keys(stateData[1]['districts']).map((item, index) => {

                                                let selected = this.state.select && this.state.select[stateData[0]] === item ? 'selected' : ''
                                                return <option key={index} selected={selected} value={item}>{item}</option>

                                            }) : <option value='No Data Found'>No Data Found</option>}
                                        </select>
                                    </label></span></p>

                                    <p className="headers">{card.title} </p>
                                    <div >
                                        <table className="center" >{
                                            this.state.select ?
                                                stateData[1]['districts'][this.state.select[stateData[0]]][card.key] ? Object.entries(stateData[1]['districts'][this.state.select[stateData[0]]][card.key]).map((item, index) => {
                                                    // console.log(item)
                                                    return < tr key={index}>
                                                        <th>{item[0]}</th>
                                                        <th>{item[1]}</th>

                                                    </tr>
                                                }) : console.log('ss111') : console.log('ss222')

                                        }
                                            {!this.state.select && stateData[1][card.key] ? Object.entries(stateData[1][card.key]).map((item, index) => {
                                                // console.log(item)
                                                return < tr key={index}>
                                                    <th>{item[0]}</th>
                                                    <th>{item[1]}</th>

                                                </tr>
                                            }) : ''}


                                        </table>
                                        <button className="seeMore" onClick={() => {
                                            // console.log('buuton ')
                                            this.props.handleCurrentView(TIMELINE_STAT, stateData)

                                        }
                                        }>See More</button>

                                    </div>

                                </div>
                            </>

                        )
                    })
                }
            </ >
        )
    }
}

class StateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: 0,
            position: 0,
            cardStyle: {
                transform: 'translateX(0px)'
            },
            width: 0,
        };
    }

    componentDidMount() {
        let boxWidth = document.getElementById("card").clientWidth;
        this.setState({ width: boxWidth });
    }

    // func: click the slider buttons
    handleClick(type) {
        // get the card's margin-right
        let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
        margin = JSON.parse(margin.replace(/px/i, ''));
        const cardWidth = this.state.width; // the card's width
        const cardMargin = margin; // the card's margin
        const cardNumber = CardData().length; // the number of cards
        let currentCard = this.state.currentCard; // the index of the current card
        let position = this.state.position; // the position of the cards

        // slide cards
        if (type === 'next' && currentCard < cardNumber - 1) {
            currentCard++;
            position -= (cardWidth + cardMargin);
        } else if (type === 'prev' && currentCard > 0) {
            currentCard--;
            position += (cardWidth + cardMargin);
        }
        this.setCard(currentCard, position);
    }

    setCard(currentCard, position) {
        this.setState({
            currentCard: currentCard,
            position: position,
            cardStyle: {
                transform: `translateX(${position}px)`
            }
        })
    }

    render() {
        return (
            <div className="cards-slider">
                <div className="slider-btns">
                    <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
                    <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
                </div>
                <Cards handleCurrentView={this.props.handleCurrentView} cardStyle={this.state.cardStyle} data={this.props.data} />
            </div>
        )
    }
}

// class StateCard extends React.Component {

//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return (
//             <div className="card stateCard">
//                 <input type="radio" name="select" id="slide_1" defaultChecked />
//                 <input type="radio" name="select" id="slide_2" />
//                 <input type="radio" name="select" id="slide_3" />
//                 <input type="checkbox" id="slideImg" />
//                 <div className="slider">
//                     <label htmlFor="slide_1" className="slide slide_1" />
//                     <label htmlFor="slide_2" className="slide slide_2" />
//                     <label htmlFor="slide_3" className="slide slide_3" />
//                 </div>
//                 <div className="inner_part">
//                     <div className="content content_1">
//                         <div className="title">İstanbul</div>
//                         <div className="text">
//                             Istanbul, a fascinating city built on two Continents, divided by the
//                             Bosphorus Strait. This is one of the greatest cities in the world.
//                         </div>
//                         <button>Read More</button>
//                     </div>
//                 </div>
//                 <div className="inner_part">
//                     <div className="content content_2">
//                         <div className="title">Ankara</div>
//                         <div className="text">
//                             Ankara is Turkey's beating heart, second largest city, located in the
//                             Central Anatolia region and home to the Grand National Assembly of
//                             Turkey.
//                         </div>
//                         <button>Read More</button>
//                     </div>
//                 </div>
//                 <div className="inner_part">
//                     <div className="content content_3">
//                         <div className="title">İzmir</div>
//                         <div className="text">
//                             Located on the shores of the Aegean Sea, west of the Anatolian
//                             Peninsula, İzmir is the third-largest city in Turkey.
//                         </div>
//                         <button>Read More</button>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }

export default StateCard;