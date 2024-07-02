const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <nav>
          <h6 className="footer-title">Getting started</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Installation</a>
          <a className="link link-hover">Setup</a>
          <a className="link link-hover">Guide</a>
        </nav>
        <nav>
          <h6 className="footer-title">Community</h6>
          <a className="link link-hover">Discord</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Github</a>
          <a className="link link-hover">YouTube</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Contact us</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Send!</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
