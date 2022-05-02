import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';


const DisplayApplications = ({applicationjobs}) => {
    const code = applicationjobs.map(({
            title,
            dateOfJoining,
            salary,
            recruiter: {name},
            status,
            typeOfJob,
            _id
        }) => <table className='table' key={_id}>
        {title ? 
<Fragment>
<hr/>
     <div class="job-post--title-wrapper">
       <h1>
       Назва:             
       </h1>
    </div>
   <div class="profile-page-section1">{title}</div>
</Fragment>
: 
<Fragment> </Fragment>}

{name ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Ім'я рекрутера:             
       </h1>
    </div>
   <div class="profile-page-section1">{name}</div>
</Fragment>
: 
<Fragment> </Fragment>}


{dateOfJoining ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Дата найму:             
       </h1>
    </div>
   <div class="profile-page-section1">{dateOfJoining}</div>
</Fragment>
: 
<Fragment> </Fragment>}


{salary ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Зарплата:             
       </h1>
    </div>
   <div class="profile-page-section1">${salary}</div>
</Fragment>
: 
<Fragment> </Fragment>}

{typeOfJob ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Тип роботи:             
       </h1>
    </div>
   <div class="profile-page-section1">{typeOfJob}</div>
</Fragment>
: 
<Fragment> </Fragment>}

{status ? 
<Fragment>
<div class="job-post--title-wrapper">
       <h1>
       Статус заявки:             
       </h1>
    </div>
   <div class="profile-page-section1">{status}</div>
</Fragment>
: 
<Fragment> </Fragment>}
    
<p class="text-danger">
<input type="submit" className="btn btn-warning" value="Оцініть роботу" />
</p>

</table>)
    return (
        <Fragment>
            <h2>Робота</h2>
            {code}
        </Fragment>
    );
}

DisplayApplications.propTypes = {
    applicationsjob: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    applicationsjob: state.applications.applications
});
export default connect(mapStateToProps, null)(DisplayApplications
);
