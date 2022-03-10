
function MobileNav({ children}) {
  return (
    <>
      <button
        uk-toggle="target: #mob-nav"
        className="uk-icon-button primary-colour-background uk-position-bottom-right uk-position-fixed uk-margin-right uk-margin-bottom menu-button"
        uk-icon="menu"
      ></button>

      <div id="mob-nav" uk-offcanvas="flip: true; overlay: true">
        <div className="uk-offcanvas-bar secondary-colour-background">
          {children}
          <button className="uk-offcanvas-close uk-icon-button" type="button" uk-icon="close" uk-close></button>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
