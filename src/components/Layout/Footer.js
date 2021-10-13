import classes from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className={classes.footer}>
      <p>&copy; Mayra Borgonovo {year}</p>
    </footer>
  )
};

export default Footer;