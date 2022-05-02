import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';
import {changeStatus, getApplications} from '../../actions/applications';


const AcceptedApplications = ({loading , applicationjobs, changeStatus, getApplications}) => {
    useEffect(()=>{
        getApplications();
    },[]);
    // console.log(applicationjobs);
    if(loading){
        return <Fragment><p>loading...</p></Fragment>
    }
    if(applicationjobs==null){
        return <h2>Кандидати рекрутера</h2>
    }
    applicationjobs =  applicationjobs.filter((val) => val.status === 'Accepted');
    const code = applicationjobs.map(({
        applicant: {name,skills},
        dateOfJoining,
        typeOfJob,
        title,
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



{dateOfJoining ? 
<Fragment>
   <div class="job-post--title-wrapper">
       <h1>
       Дата приєднання:             
       </h1>
    </div>
   <div class="profile-page-section1">{dateOfJoining}</div>
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

{title ? 
<Fragment>
   <div class="job-post--title-wrapper">
       <h1>
       Назва роботи:             
       </h1>
    </div>
   <div class="profile-page-section1">{title}</div>
</Fragment>
: 
<Fragment> </Fragment>}

{skills ? 
<Fragment>
   <div class="job-post--title-wrapper">
       <h1>
       Навички кандидата:             
       </h1>
    </div>
   <div class="profile-page-section1">{skills}</div>
</Fragment>
: 
<Fragment> </Fragment>}


        <p class="text-danger">
        <button type="submit" className='btn btn-warning'>Оцінити</button>
        </p>
    

</table>)
    return (
        <Fragment>
            <h2>Кандидати рекрутера</h2>
            {code}
        </Fragment>
    );
}

AcceptedApplications.propTypes = {
    applicationjobs: PropTypes.array.isRequired,
    changeStatus: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    getApplications: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    applicationjobs: state.applications.applications,
    loading: state.applications.loading
});
export default connect(mapStateToProps, {changeStatus, getApplications})(AcceptedApplications
);
