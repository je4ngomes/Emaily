import React from 'react';

const ShowEmailList = ({ emails, style, offset}) => {
    const list = emails.map((email, i) => (email ? <div key={i} className="chip">{email}</div> : null));

    return (
        <div className="row">
            <div className={"col s12 m7 " + offset} style={style}>
                {list.length > 8 ? (
                    <div>
                        {list.slice(null, 8)}
                        {"..."}
                    </div>) : list}
            </div>
        </div>
    );
};

export default ShowEmailList;
