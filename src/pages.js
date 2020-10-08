import React from "react";
import { Route, Switch } from "react-router-dom";
import { MainMenu, AboutMenu } from "./menus";
import "../stylesheets/pages.scss";
import "../stylesheets/Card.scss";
import Card from "./components/ui/Card.jsx";
import Carousel from "./components/ui/Carousel.jsx";

import {
  Forgot,
  Reset,
  LogoutId,
  NewUser,
  OwnerDashboardId,
  VideoDashboardId,
  UserLogin,
} from "./components/containers";

const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

export const Home = () => (
  <PageTemplate>
    <div className="home">
      <div id="home-top-h1">
        <h1>WildAlmonds</h1>
        <div className="container-fluid home-h1-container">
          <div className="row">
            <div className="col">
              <h2 id="home-h2">WildAlmonds for Wines</h2>
            </div>
            <div className="col">
              <h2 id="home-h2">
                {" "}
                Why start with a stack ranked voting system?
              </h2>
            </div>
          </div>
        </div>
      </div>
      <section id="wines">
        <div className="container-fluid" id="opn">
          <div className="row">
            <div className="col">
              <p id="tp-h2-p">
                We connect the customers of Washington State wines to highly
                engaging product rating and sales events. WildAlmonds is a
                platform built around an easy to use Drag and Drop functionality
                centered around a stacked rank voting system.
              </p>
              <p>
                Companies should be fun, flexible, and sustainable. Often, teams
                are faced with multiple options rather than a single choice.
                Using the wisdom of the crowd philosophy (what would please the
                most individuals or what most believe to be the most likely)
                greatly improves the final outcome. Basically, we all need to
                have access to an easy experience that gets us to a what matters
                decision quickly.
              </p>
            </div>
          </div>
        </div>
        <div id="tp-h3-center">
          <h3> So how do I use it?</h3>
          <p>The solution works on 4 simple core concepts:</p>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col" id="create-col-1">
              <div className="create-1">
                <h4>Creation:</h4>
                Once you have an account, the Create Tournament option is
                available from the Owner Page. Currently, the Create page allows
                you a free 4x4x4 Survey: 4 Almonds 4 Squares and 4 invites. We
                can easily create you a custom Survey outside the Demo
                restrictions.
              </div>
              <div className="create-2">
                <strong>Create an account at:</strong>{" "}
                <a href="https://wildalmonds.com/signup">Signup</a>
              </div>
            </div>
            <div className="col">
              <h4>Invitation:</h4>
              Now that you have completed the Creation phase, you are ready to
              send your invitations to your participants. In the Owner
              Dashboard, you will see your Tournament board. Click or touch the
              Dashboard button. This displays your voting results as well as
              your invite cards. Invites are sent via Email from the
              support@wildalmonds.com account. Please have your invitees search
              for a message from this sender. Fill that out for a new user and
              hit the <strong>Send It!</strong> button.
            </div>
            <div className="w-100" id="row-2"></div>
            <div className="col">
              <h4>Participation:</h4>
              Your participants receive within the email their own unique link
              to your WildAlmonds Event. Clicking the link sends them to our
              site where they are greeted with your survey owner and the
              description summary of what the survey is about. There, they
              choose the Accept button to link to the Event page. This page
              allows your participant to rank their choices via Almonds for your
              Squares. This is done via touchscreen or mouse by dragging the
              Almonds above the Square and releasing it. Once all picks are
              completed, the participant receives the Lock Picks button. More
              detail are available here at{" "}
              <a href="https://wildalmonds.com/about/help">How to Play</a>
            </div>
            <div className="col">
              <h4>Aggregation:</h4>
              Each Survey request sent appears in your Event report. We do not
              show which picks your users individually selected, we total those
              up. You will see when you sent the request, when the user last
              Accepted, and when the picks where Locked. For best results,
              please strongly encourage your participants to Lock their picks.
              As they change those picks, your results will change in your
              summarized totals.
            </div>
          </div>
        </div>
        <div className="container" id="bot-cont">
          <h4>That is it!</h4>
          We have just walked through the solution end-to-end. It is simply a
          matter of inviting more participants to the Event via the Owner Panel.
          As results come in, you may see that you have a passionate base that
          supports a single option, but the Total for another is highest. This
          is your wisdom of the crowd selection and it deserves a consideration.
          The more invites you send, the better this reporting will be.
        </div>
        <div id="btm-h2">
          <h2>Reminder</h2>
          <p>
            We can easily customize the number of Invitations, Almonds and
            Squares for you. We need your help to grow the site. Please do give
            us your feedback, invite us to your Events, and let us earn your
            trust and partnership. Contact us at wildalmondz@gmail.com. We would
            love to hear from you. Or, setup a tournament with your own account
            and ask us through the application.
          </p>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export const Whoops404 = ({ location }) => (
  <div className="whoops-404">
    <h1>This resource not found at '{location.pathname}'</h1>
  </div>
);

export const Invite = () => (
  <PageTemplate>
    <section className="invite">
      <hr />
      <Switch>
        <Route exact path="/invite/:gameId" component={SendInvite} />
      </Switch>
    </section>
  </PageTemplate>
);

export const Owner = () => (
  <PageTemplate>
    <section className="owner">
      <h1>[Owner Page]</h1>
      <hr />
      <Switch>
        <Route exact path="/owner/dashboard" component={OwnerDashboardId} />
      </Switch>
    </section>
  </PageTemplate>
);

export const Login = () => (
  <PageTemplate>
    <section className="login">
      <UserLogin />
    </section>
  </PageTemplate>
);

export const Video = () => (
  <PageTemplate>
    <section className="video">
      <VideoDashboardId />
    </section>
  </PageTemplate>
);

export const Logout = () => (
  <PageTemplate>
    <section className="logout">
      <h1>[Logout]</h1>
      <Route exact path="/logout" component={LogoutId} />
    </section>
  </PageTemplate>
);

export const Signup = () => (
  <PageTemplate>
    <section className="signup">
      <NewUser />
    </section>
  </PageTemplate>
);

export const ForgotPassword = () => (
  <PageTemplate>
    <section className="forgot">
      <h1>[Forgot Password]</h1>
      <Forgot />
    </section>
  </PageTemplate>
);

export const ResetPassword = () => (
  <PageTemplate>
    <section className="reset">
      <h1>[Reset Password]</h1>
      <Reset />
    </section>
  </PageTemplate>
);

export const Contact = () => (
  <PageTemplate>
    <section className="logout">
      <br />
      <br />
      <br />
      <br />
      <h1>[Logout]</h1>
    </section>
  </PageTemplate>
);

export const Services = () => (
  <section className="services">
    <div className="faq-h1">
      <h1>FAQ's</h1>
    </div>
    <div className="container-fluid" id="faq-h2-1">
      <h2>How is WildAlmonds different?</h2>
      <p>
        WildAlmonds is a points based survey system rather than traditional vote
        for one option or ratings of several distinct items where only 51% of
        the respondents need to be happy. We also have interactive squares that
        provide much greater detail regarding the options being ranked.
      </p>
    </div>
    <Carousel />
    <Card />
  </section>
);

export const Media = () => (
  <section className="media">
    <VideoDashboardId />
  </section>
);

export const Terms = () => (
  <section className="terms">
    <br />
    <br />
    <br />
    <br />
    <h1>WildAlmonds</h1>
    <h4>Terms & Conditions</h4>
    <p>
      Effective Date: April 24th, 2020
      <br />
      Site Covered: https://wildalmonds.com
      <br />
      <br />
      THE AGREEMENT: The use of this website and services on this website
      provided by WildAlmonds (hereinafter referred to as "Company") are subject
      to the following Terms & Conditions (hereinafter the "Agreement"), all
      parts and sub-parts of which are specifically incorporated by reference
      here. This Agreement shall govern the use of all pages on this website
      (hereinafter collectively referred to as "Website") and any services
      provided by or on this Website ("Services").
      <br />
      <br />
      1) DEFINITIONS The parties referred to in this Agreement shall be defined
      as follows:
      <br />
      a) Company, Us, We: The Company, as the creator, operator, and publisher
      of the Website, makes the Website, and certain Services on it, available
      to users. WildAlmonds, Company, Us, We, Our, Ours and other first-person
      pronouns will refer to the Company, as well as all employees and
      affiliates of the Company.
      <br />
      b) You, the User, the Client: You, as the user of the Website, will be
      referred to throughout this Agreement with second-person pronouns such as
      You, Your, Yours, or as User or Client.
      <br />
      c) Parties: Collectively, the parties to this Agreement (the Company and
      You) will be referred to as Parties.
      <br />
      <br />
      2) ASSENT & ACCEPTANCE By using the Website, You warrant that You have
      read and reviewed this Agreement and that You agree to be bound by it. If
      You do not agree to be bound by this Agreement, please leave the Website
      immediately. The Company only agrees to provide use of this Website and
      Services to You if You assent to this Agreement.
      <br />
      <br />
      3) LICENSE TO USE WEBSITE The Company may provide You with certain
      information as a result of Your use of the Website or Services. Such
      information may include, but is not limited to, documentation, data, or
      information developed by the Company, and other materials which may assist
      in Your use of the Website or Services ("Company Materials"). Subject to
      this Agreement, the Company grants You a non-exclusive, limited,
      non-transferable and revocable license to use the Company Materials solely
      in connection with Your use of the Website and Services. The Company
      Materials may not be used for any other purpose, and this license
      terminates upon Your cessation of use of the Website or Services or at the
      termination of this Agreement.
      <br />
      <br />
      4) INTELLECTUAL PROPERTY You agree that the Website and all Services
      provided by the Company are the property of the Company, including all
      copyrights, trademarks, trade secrets, patents, and other intellectual
      property ("Company IP"). You agree that the Company owns all right, title
      and interest in and to the Company IP and that You will not use the
      Company IP for any unlawful or infringing purpose. You agree not to
      reproduce or distribute the Company IP in any way, including
      electronically or via registration of any new trademarks, trade names,
      service marks or Uniform Resource Locators (URLs), without express written
      permission from the Company. a) In order to make the Website and Services
      available to You, You hereby grant the Company a royalty-free,
      non-exclusive, worldwide license to copy, display, use, broadcast,
      transmit and make derivative works of any content You publish, upload, or
      otherwise make available to the Website ("Your Content"). The Company
      claims no further proprietary rights in Your Content. b) If You feel that
      any of Your intellectual property rights have been infringed or otherwise
      violated by the posting of information or media by another of Our users,
      please contact Us and let Us know.
      <br />
      <br />
      5) USER OBLIGATIONS As a user of the Website or Services, You may be asked
      to register with Us. When You do so, You will choose a user identifier,
      which may be Your email address or another term, as well as a password.
      You may also provide personal information, including, but not limited to,
      Your name. You are responsible for ensuring the accuracy of this
      information. This identifying information will enable You to use the
      Website and Services. You must not share such identifying information with
      any third party, and if You discover that Your identifying information has
      been compromised, You agree to notify Us immediately in writing. Email
      notification will suffice. You are responsible for maintaining the safety
      and security of Your identifying information as well as keeping Us
      apprised of any changes to Your identifying information. Providing false
      or inaccurate information, or using the Website or Services to further
      fraud or unlawful activity is grounds for immediate termination of this
      Agreement.
      <br />
      <br />
      6) ACCEPTABLE USE You agree not to use the Website or Services for any
      unlawful purpose or any purpose prohibited under this clause. You agree
      not to use the Website or Services in any way that could damage the
      Website, Services, or general business of the Company.
      <br />
      a) You further agree not to use the Website or Services:
      <br />
      I) To harass, abuse, or threaten others or otherwise violate any person's
      legal rights;
      <br />
      II) To violate any intellectual property rights of the Company or any
      third party;
      <br />
      III) To upload or otherwise disseminate any computer viruses or other
      software that may damage the property of another;
      <br />
      IV) To perpetrate any fraud;
      <br />
      V) To engage in or create any unlawful gambling, sweepstakes, or pyramid
      scheme;
      <br />
      VI) To publish or distribute any obscene or defamatory material;
      <br />
      VII) To publish or distribute any material that incites violence, hate, or
      discrimination towards any group;
      <br />
      VIII) To unlawfully gather information about others.
      <br />
      <br />
      7) AFFILIATE MARKETING & ADVERTISING The Company, through the Website and
      Services, may engage in affiliate marketing whereby the Company receives a
      commission on or percentage of the sale of goods or services on or through
      the Website. The Company may also accept advertising and sponsorships from
      commercial businesses or receive other forms of advertising compensation.
      This disclosure is intended to comply with the US Federal Trade Commission
      Rules on marketing and advertising, as well as any other legal
      requirements which may apply.
      <br />
      <br />
      8) PRIVACY INFORMATION Through Your Use of the Website and Services, You
      may provide Us with certain information. By using the Website or the
      Services, You authorize the Company to use Your information in the United
      States and any other country where We may operate.
      <br />
      a) Information We May Collect or Receive: When You register for an
      account, You provide Us with a valid email address and may provide Us with
      additional information, such as Your name or billing information.
      Depending on how You use Our Website or Services, We may also receive
      information from external applications that You use to access Our Website,
      or We may receive information through various web technologies, such as
      cookies, log files, clear gifs, web beacons or others.
      <br />
      b) How We Use Information: We use the information gathered from You to
      ensure Your continued good experience on Our website, including through
      email communication. We may also track certain aspects of the passive
      information received to improve Our marketing and analytics, and for this,
      We may work with third-party providers.
      <br />
      c) How You Can Protect Your Information: If You would like to disable Our
      access to any passive information We receive from the use of various
      technologies, You may choose to disable cookies in Your web browser.
      Please be aware that the Company will still receive information about You
      that You have provided, such as Your email address. If You choose to
      terminate Your account, the Company will store information about You for
      the following number of days: 30. After that time, it will be deleted.
      <br />
      <br />
      9) REVERSE ENGINEERING & SECURITY You agree not to undertake any of the
      following actions:
      <br />
      a) Reverse engineer, or attempt to reverse engineer or disassemble any
      code or software from or on the Website or Services;
      <br />
      b) Violate the security of the Website or Services through any
      unauthorized access, circumvention of encryption or other security tools,
      data mining or interference to any host, user or network.
      <br />
      <br />
      10) DATA LOSS The Company does not accept responsibility for the security
      of Your account or content. You agree that Your use of the Website or
      Services is at Your own risk.
      <br />
      <br />
      11) INDEMNIFICATION You agree to defend and indemnify the Company and any
      of its affiliates (if applicable) and hold Us harmless against any and all
      legal claims and demands, including reasonable attorney's fees, which may
      arise from or relate to Your use or misuse of the Website or Services,
      Your breach of this Agreement, or Your conduct or actions. You agree that
      the Company shall be able to select its own legal counsel and may
      participate in its own defense, if the Company wishes.
      <br />
      <br />
      12) SPAM POLICY You are strictly prohibited from using the Website or any
      of the Company's Services for illegal spam activities, including gathering
      email addresses and personal information from others or sending any mass
      commercial emails.
      <br />
      <br />
      13) THIRD-PARTY LINKS & CONTENT The Company may occasionally post links to
      third party websites or other services. You agree that the Company is not
      responsible or liable for any loss or damage caused as a result of Your
      use of any third party services linked to from Our Website.
      <br />
      <br />
      14) MODIFICATION & VARIATION The Company may, from time to time and at any
      time without notice to You, modify this Agreement. You agree that the
      Company has the right to modify this Agreement or revise anything
      contained herein. You further agree that all modifications to this
      Agreement are in full force and effect immediately upon posting on the
      Website and that modifications or variations will replace any prior
      version of this Agreement, unless prior versions are specifically referred
      to or incorporated into the latest modification or variation of this
      Agreement.
      <br />
      a) To the extent any part or sub-part of this Agreement is held
      ineffective or invalid by any court of law, You agree that the prior,
      effective version of this Agreement shall be considered enforceable and
      valid to the fullest extent.
      <br />
      b) You agree to routinely monitor this Agreement and refer to the
      Effective Date posted at the top of this Agreement to note modifications
      or variations. You further agree to clear Your cache when doing so to
      avoid accessing a prior version of this Agreement. You agree that Your
      continued use of the Website after any modifications to this Agreement is
      a manifestation of Your continued assent to this Agreement.
      <br />
      c) In the event that You fail to monitor any modifications to or
      variations of this Agreement, You agree that such failure shall be
      considered an affirmative waiver of Your right to review the modified
      Agreement.
      <br />
      <br />
      15) ENTIRE AGREEMENT This Agreement constitutes the entire understanding
      between the Parties with respect to any and all use of this Website. This
      Agreement supersedes and replaces all prior or contemporaneous agreements
      or understandings, written or oral, regarding the use of this Website.
      <br />
      <br />
      16) SERVICE INTERRUPTIONS The Company may need to interrupt Your access to
      the Website to perform maintenance or emergency services on a scheduled or
      unscheduled basis. You agree that Your access to the Website may be
      affected by unanticipated or unscheduled downtime, for any reason, but
      that the Company shall have no liability for any damage or loss caused as
      a result of such downtime.
      <br />
      <br />
      17) TERM, TERMINATION & SUSPENSION The Company may terminate this
      Agreement with You at any time for any reason, with or without cause. The
      Company specifically reserves the right to terminate this Agreement if You
      violate any of the terms outlined herein, including, but not limited to,
      violating the intellectual property rights of the Company or a third
      party, failing to comply with applicable laws or other legal obligations,
      and/or publishing or distributing illegal material. If You have registered
      for an account with Us, You may also terminate this Agreement at any time
      by contacting Us and requesting termination. At the termination of this
      Agreement, any provisions that would be expected to survive termination by
      their nature shall remain in full force and effect.
      <br />
      <br />
      18) NO WARRANTIES You agree that Your use of the Website and Services is
      at Your sole and exclusive risk and that any Services provided by Us are
      on an "As Is" basis. The Company hereby expressly disclaims any and all
      express or implied warranties of any kind, including, but not limited to
      the implied warranty of fitness for a particular purpose and the implied
      warranty of merchantability. The Company makes no warranties that the
      Website or Services will meet Your needs or that the Website or Services
      will be uninterrupted, error-free, or secure. The Company also makes no
      warranties as to the reliability or accuracy of any information on the
      Website or obtained through the Services. You agree that any damage that
      may occur to You, through Your computer system, or as a result of loss of
      Your data from Your use of the Website or Services is Your sole
      responsibility and that the Company is not liable for any such damage or
      loss.
      <br />
      <br />
      19) LIMITATION ON LIABILITY The Company is not liable for any damages that
      may occur to You as a result of Your use of the Website or Services, to
      the fullest extent permitted by law. The maximum liability of the Company
      arising from or relating to this Agreement is limited to the greater of
      one hundred ($100) US Dollars or the amount You paid to the Company in the
      last six (6) months. This section applies to any and all claims by You,
      including, but not limited to, lost profits or revenues, consequential or
      punitive damages, negligence, strict liability, fraud, or torts of any
      kind.
      <br />
      <br />
      20) GENERAL PROVISIONS:
      <br />
      a) LANGUAGE: All communications made or notices given pursuant to this
      Agreement shall be in the English language.
      <br />
      b) JURISDICTION, VENUE & CHOICE OF LAW: Through Your use of the Website or
      Services, You agree that the laws of the State of Washington shall govern
      any matter or dispute relating to or arising out of this Agreement, as
      well as any dispute of any kind that may arise between You and the
      Company, with the exception of its conflict of law provisions. In case any
      litigation specifically permitted under this Agreement is initiated, the
      Parties agree to submit to the personal jurisdiction of the state and
      federal courts of the following county: Snohomish, Washington The Parties
      agree that this choice of law, venue, and jurisdiction provision is not
      permissive, but rather mandatory in nature. You hereby waive the right to
      any objection of venue, including assertion of the doctrine of forum non
      conveniens or similar doctrine.
      <br />
      c) ARBITRATION: In case of a dispute between the Parties relating to or
      arising out of this Agreement, the Parties shall first attempt to resolve
      the dispute personally and in good faith. If these personal resolution
      attempts fail, the Parties shall then submit the dispute to binding
      arbitration. The arbitration shall be conducted in the following county:
      Snohomish. The arbitration shall be conducted by a single arbitrator, and
      such arbitrator shall have no authority to add Parties, vary the
      provisions of this Agreement, award punitive damages, or certify a lass.
      The arbitrator shall be bound by applicable and governing Federal law as
      well as the law of the following state: Washington. Each Party shall pay
      their own costs and fees. Claims necessitating arbitration under this
      section include, but are not limited to: contract claims, tort claims,
      claims based on Federal and state law, and claims based on local laws,
      ordinances, statutes or regulations. Intellectual property claims by the
      Company will not be subject to arbitration and may, as an exception to
      this sub-part, be litigated. The Parties, in agreement with this sub-part
      of this Agreement, waive any rights they may have to a jury trial in
      regard to arbitral claims.
      <br />
      d) ASSIGNMENT: This Agreement, or the rights granted hereunder, may not be
      assigned, sold, leased or otherwise transferred in whole or part by You.
      Should this Agreement, or the rights granted hereunder, by assigned, sold,
      leased or otherwise transferred by the Company, the rights and liabilities
      of the Company will bind and inure to any assignees, administrators,
      successors, and executors.
      <br />
      e) SEVERABILITY: If any part or sub-part of this Agreement is held invalid
      or unenforceable by a court of law or competent arbitrator, the remaining
      parts and sub-parts will be enforced to the maximum extent possible. In
      such condition, the remainder of this Agreement shall continue in full
      force.
      <br />
      f) NO WAIVER: In the event that We fail to enforce any provision of this
      Agreement, this shall not constitute a waiver of any future enforcement of
      that provision or of any other provision. Waiver of any part or sub-part
      of this Agreement will not constitute a waiver of any other part or
      sub-part.
      <br />
      g) HEADINGS FOR CONVENIENCE ONLY: Headings of parts and sub-parts under
      this Agreement are for convenience and organization, only. Headings shall
      not affect the meaning of any provisions of this Agreement.
      <br />
      h) NO AGENCY, PARTNERSHIP OR JOINT VENTURE: No agency, partnership, or
      joint venture has been created between the Parties as a result of this
      Agreement. No Party has any authority to bind the other to third parties.
      <br />
      i) FORCE MAJEURE: The Company is not liable for any failure to perform due
      to causes beyond its reasonable control including, but not limited to,
      acts of God, acts of civil authorities, acts of military authorities,
      riots, embargoes, acts of nature and natural disasters, and other acts
      which may be due to unforeseen circumstances.
      <br />
      j) ELECTRONIC COMMUNICATIONS PERMITTED: Electronic communications are
      permitted to both Parties under this Agreement, including e-mail or fax.
      <br />
      <br />
      For any questions or concerns, please email Us at the following address:
      wildalmondz@gmail.com
      <br />
    </p>
  </section>
);

// const wildimg = require("../src/images/wineryroad.jpg");

export const Company = () => (
  <section className="company">
    <div className="container-fluid" id="open">
      <div className="row">
        <div className="col-4" id="wldalmds">
          <h1>WildAlmonds</h1>
          <p>
            WildAlmonds is a platform built around an easy to use Drag and Drop
            functionality centered around a stacked rank voting system.
          </p>
        </div>
        <div className="col-8" id="WRimg"></div>
      </div>
    </div>
    <div className="container-sm" id="why3">
      <h3> Why start with a stack ranked voting system?</h3>
      <p>
        Companies should be fun, flexible, and sustainable. Often, teams are
        faced with multiple options rather than a single choice. Using the
        wisdom of the crowd philosophy (what would please the most individuals
        or what most believe to be the most likely) greatly improves the final
        outcome. Basically, we all need to have access to an easy experience
        that gets us to a what matters decision quickly.
      </p>
    </div>
    <br />
    <div className="container-fluid" id="howh3">
      <h3> So how do I use it?</h3>
      <p>The solution works on 4 simple core concepts:</p>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col crtwrap">
          <div className="card-flip">
            <div className="cfront">
              <h4>Creation:</h4>
              <strong>Create an account at:</strong>{" "}
              <a href="https://wildalmonds.com/signup">Signup</a>
            </div>
            <div className="cback">
              <p>
                Once you have an account, the Create Tournament option is
                available from the Owner Page. Currently, the Create page allows
                you a free 4x4x4 Survey: 4 Almonds 4 Squares and 4 invites. We
                can easily create you a custom Survey outside the Demo
                restrictions.
              </p>
            </div>
          </div>
        </div>
        <div className="col" id="4sqr">
          <h4>Invitation:</h4>
          <div id="sqr">
            Now that you have completed the Creation phase, you are ready to
            send your invitations to your participants. In the Owner Dashboard,
            you will see your Tournament board. Click or touch the Dashboard
            button. This displays your voting results as well as your invite
            cards. Invites are sent via Email from the wildalmonds@yahoo.com
            account. Please have your invitees search for a message from this
            sender. Fill that out for a new user and hit the{" "}
            <strong>Send It!</strong> button.
          </div>
        </div>
        <div className="w-100" style={{ marginBottom: "2em" }}></div>
        <div className="col" id="4sqr">
          <h4>Participation:</h4>
          <div id="sqr">
            Your participants receive within the email their own unique link to
            your WildAlmonds Event. Clicking the link sends them to our site
            where they are greeted with your survey owner and the description
            summary of what the survey is about. There, they choose the Accept
            button to link to the Event page. This page allows your participant
            to rank their choices via Almonds for your Squares. This is done via
            touchscreen or mouse by dragging the Almonds above the Square and
            releasing it. Once all picks are completed, the participant receives
            the Lock Picks button. More detail are available here at{" "}
            <a href="https://wildalmonds.com/about/help">How to Play</a>
          </div>
        </div>
        <div className="col">
          <h4 style={{ marginBottom: "2em" }}>Aggregation:</h4>
          <div>
            Each Survey request sent appears in your Event report. We do not
            show which picks your users individually selected, we total those
            up. You will see when you sent the request, when the user last
            Accepted, and when the picks where Locked. For best results, please
            strongly encourage your participants to Lock their picks. As they
            change those picks, your results will change in your summarized
            totals.
          </div>
        </div>
      </div>
      <div className="container-fluid" id="btm">
        <h4>That is it!</h4>
        <div className="row">
          <div className="col-8" id="btmimg"></div>
          <p className="col-4">
            We have just walked through the solution end-to-end. It is simply a
            matter of inviting more participants to the Event via the Owner
            Panel. As results come in, you may see that you have a passionate
            base that supports a single option, but the Total for another is
            highest. This is your wisdom of the crowd selection and it deserves
            a consideration. The more invites you send, the better this
            reporting will be.
          </p>
        </div>
      </div>
      <div id="rmndr">
        <h2>
          <b>Reminder</b>
        </h2>
        <div class="alert alert-success" role="alert">
          We can easily customize the number of Invitations, Almonds and Squares
          for you. We need your help to grow the site. Please do give us your
          feedback, invite us to your Events, and let us earn your trust and
          partnership. Contact us at wildalmondz@gmail.com. We would love to
          hear from you. Or, setup a tournament with your own account and ask us
          through the application.
        </div>
      </div>
    </div>
  </section>
);

export const Help = () => (
  <section className="help">
    <br />
    <br />
    <br />
    <br />
    <h1>How to participate</h1>
    <p>
      WildAlmonds is a vote by ranking system built around drag and drop
      functionality. It is an invite system, meaning that market barriers like
      external account creation is removed. All the participant needs is to
      follow the provide link to our webpage to participate. They get a unique
      url just for them and your event!
    </p>
    <h3>Play by Invite</h3>
    <p>
      The Admin of the Event sends you a message including your very unique
      link. Your link is not secure so do not share it with others. Once you
      follow the link, click the image for the event. To secure your
      participation and see all the events you have participated in, create an
      account and join WildAlmonds by using Signup. With or without an account,
      our site allows you to return to the page later to view your picks.
    </p>

    <h3>Making a selection</h3>
    <p>
      Use your mouse or touch and drag an almond to a square. Note that the
      Almond is a strike out and the number of the Almond is attached to the
      square. Your picks are written to the database as they are made. You will
      be able to edit your picks until either the event expires or you choose to
      Lock Picks.
    </p>
    <h3>Deleting a selection</h3>
    <p>
      Click an Almond that has been selected. Select OK when prompted to remove
      the pick.
    </p>
    <h3>Locking the picks</h3>
    <p>
      Once all picks have been made <strong>Picks Remain: 0</strong> the Lock
      Picks button will appear. Click the Lock Picks button and either confirm
      that you are committed to your selections but choosing OK or return for
      futher picks. The admin of the tournament can see when you have accepted
      and when you lock your picks. They currently cannot see what you have
      chosen.
    </p>
  </section>
);
export const About = ({ match }) => (
  <PageTemplate>
    <section className="about">
      <Route component={AboutMenu} />
      <Route exact path="/about" component={Company} />
      <Route path="/about/help" component={Help} />
      <Route path="/about/services" component={Services} />
      <Route path="/about/media" component={Media} />
      <Route path="/about/terms" component={Terms} />
      <Route path="/about/videos" component={Video} />
    </section>
  </PageTemplate>
);
