import React, {Component} from 'react';

export default (WrappedComponent,req_info=[])=> {
    class WrapCombine extends Component {
        render() {
            return (
                <div>

                </div>
            );
        }
    }

    return WrapCombine
}
