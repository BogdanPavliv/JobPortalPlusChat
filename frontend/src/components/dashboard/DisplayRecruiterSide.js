import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';
import {changeStatus} from '../../actions/applications';


const DisplayRecruiterSide = ({applicationjobs, changeStatus}) => {
    
    applicationjobs =  applicationjobs.filter((val) => val.status !== 'Rejected' && val.status!== 'Accepted');
    const code = applicationjobs.map(({
        applicant: {name,skills},
        dateOfJoining,
        dateOfApplication,
        sop,
        status,
        job_id,
        _id
        }) => <table className='table' key={_id}>
        
{name ? 
<Fragment>
    <hr/>
<div class="job-post--title-wrapper">
       <h1>
        Бажана посада заявника:             
       </h1>
    </div>
<div class="profile-page-section1">{name}</div>
</Fragment>
: 
<Fragment> </Fragment>}

{skills ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Навички заявника:      
       </h1>
    </div>
<div class="profile-page-section1">{skills}</div>
       
   
</Fragment>
: 
<Fragment> </Fragment>}


{dateOfApplication ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Дата подачі заявки:     
       </h1>
    </div>
<div class="profile-page-section1">{dateOfApplication}</div>   
</Fragment>
: 
<Fragment> </Fragment>}


{sop ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Повідомлення від кандидата:    
       </h1>
    </div>
<div class="profile-page-section1">{sop}</div> 
</Fragment>
: 
<Fragment> </Fragment>}

{status ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Статус заявки    
       </h1>
    </div>
<div class="profile-page-section1">{status}</div> 
</Fragment>
: 
<Fragment> </Fragment>}
    
<tr>
    <td>
    
    {
    status === 'Applied' ? 
    <Fragment>
        <button className="btn btn-success" onClick={(e) => changeStatus({_id,status, newstatus: 'Shortlist', nopositions: 0, noapplications: 0,job_id})}>Короткий список дій</button>
    </Fragment>
    :
    (
        status === 'Shortlist' ? 
        <button className="btn btn-success" onClick={(e) => changeStatus({_id,status, newstatus: 'Accepted', nopositions: 1, noapplications: 0, job_id})}>Прийняти</button>
        :
        <Fragment/>
    )
    }    
    </td>
    {status !== 'Accepted' ? <td>
    <button className="btn btn-danger" onClick={(e) => changeStatus({_id,status, newstatus: 'Rejected', nopositions: 0, noapplications: -1, job_id})}>Відхилити</button>
    </td>
    :
    <Fragment/>
}
    
    </tr>

</table>)
    return (
        <Fragment>
            
            {code}
        </Fragment>
    );
}

DisplayRecruiterSide.propTypes = {
    applicationsjob: PropTypes.array.isRequired,
    changeStatus: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    applicationsjob: state.applications.applications
});
export default connect(mapStateToProps, {changeStatus})(DisplayRecruiterSide
);
