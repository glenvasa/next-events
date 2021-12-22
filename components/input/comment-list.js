import classes from './comment-list.module.css';

function CommentList(props) {
  console.log(props.items);
  return (
    <ul className={classes.comments}>
     
      {props.items.map(item => 
        <li key={item.id}>
          <p>{item.text}</p>
          <div>By <address>{item.name}</address></div>
        </li>
      )}
      {/* <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li> */}
    </ul>
  );
}

export default CommentList;