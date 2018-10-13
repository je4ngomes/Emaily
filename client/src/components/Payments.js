import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import withAuthConsumer from '../contexts/auth/withAuthConsumer';

class Payments extends Component {

    render () {
        const { auth } = this.props

        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 survey credits"
                amount={500}
                token={auth.handleStripeToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button style={{fontWeight: 'bold'}} className="btn green waves-effect waves-light">Add Credits</button>
            </StripeCheckout>
        )
    }
}

export default withAuthConsumer(Payments);