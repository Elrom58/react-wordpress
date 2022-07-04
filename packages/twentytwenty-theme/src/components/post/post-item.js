import { connect, styled, css } from "frontity";
import Link from "../link";
import FeaturedMedia from "./featured-media";
import PostMeta from "./post-meta";
import PostCategories from "./post-categories";
import PostTags from "./post-tags";

/**
 * Article Component.
 *
 * It renders the preview of a blog post. Each blog post contains:
 * - Title: clickable title of the post.
 * - Author: name of author and published date.
 * - FeaturedMedia: the featured image/video of the post.
 *
 * @param props.state - The Frontity state.
 * @param props.libraries - The Frontity libraries.
 * @param props.item - The post entity.
 * @param props.showExcerpt - If the post excerpt should be rendered.
 * @param props.showMedia - If the featured media should be rendered.
 *
 * @returns React element.
 */
const PostItem = ({
  state,
  libraries,
  item,
  showExcerpt,
  showMedia = true,
}) => {
  // Get all categories
  const allCategories = state.source.category;

  const containerWidth = state.router.link === "/" ? "40%" : "100%";

  /**
   * The item's categories is an array of each category id. So, we'll look up
   * the details of each category in allCategories.
   */
  const categories =
    item.categories && item.categories.map((catId) => allCategories[catId]);

  // Get all tags
  const allTags = state.source.tag;

  /**
   * The item's categories is an array of each tag id. So, we'll look up the
   * details of each tag in allTags.
   */
  const tags = item.tags && item.tags.map((tagId) => allTags[tagId]);

  const content = showExcerpt ? item.excerpt : item.content;
  const { Component: Html2React } = libraries.html2react;
  return (
    <Post
      css={css`
        @media (min-width: 700px) {
          width: 47% !important;
        }
        background-color: #fff;
        margin-top: 5rem;
        padding-top: 4rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: 5px 5px 15px 5px #000000;
        box-shadow: 5px 5px 15px 5px #000000;
      `}
    >
      <PostHeader>
        <SectionContainer>
          {/* If the post has categories, render the categories */}
          {item.categories && <PostCategories categories={categories} />}

          {/* The clickable heading for the post */}
          <PostLink link={item.link}>
            <PostItemTitle
              className="heading-size-1"
              dangerouslySetInnerHTML={{ __html: item.title.rendered }}
            />
          </PostLink>

          {/* The post's metadata like author, publish date, and comments */}
          <PostMeta item={item} />
        </SectionContainer>
      </PostHeader>

      {/*
       * If the want to show featured media in the
       * list of featured posts, we render the media.
       */}
      {state.theme.featuredMedia.showOnArchive && showMedia && (
        <FeaturedMedia id={item.featured_media} />
      )}

      {/* If the post has an excerpt (short summary text), we render it */}
      {content && (
        <PostInner size="thin">
          {/* TODO: Change this to HTML2React */}
          {/* dangerouslySetInnerHTML={{ __html: content.rendered }} */}
          <EntryContent>
            <Html2React html={content.rendered} />
          </EntryContent>
          {/* If the post has tags, render it */}
          {item.tags && <PostTags tags={tags} />}
        </PostInner>
      )}
      <div className="btn">
        <PostLink link={item.link}>
          <button>MEHR ERFAHREN</button>
        </PostLink>
      </div>
    </Post>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(PostItem);

// All styles :)

export const Post = styled.article`
  background-color: #fff;
  margin-top: 5rem;
  padding-top: 4rem;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;

  button {
    -webkit-transition: background-color ease 0.25s;
    transition: background-color ease 0.25s;
    padding-left: 5px;
    padding-right: 5px;
    padding: 10px;
    border: 2px solid;
    border-color: #eca419;
    font-family: Kelson, system-ui, Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 500;
    display: inline-block;
    color: #000;
    margin-bottom: 30px;
    background: transparent;
  }
  button:hover {
    background-color: #eca419;
    color: #fff;
  }

  .btn {
    display: flex;
    justify-content: center;
  }
`;

export const PostHeader = styled.header`
  text-align: center;
`;

// Header sizes bases on style.css
const maxWidths = {
  thin: "58rem",
  small: "80rem",
  medium: "100rem",
};

/**
 * Return a CSS size depending on the value of the `size` prop received (see
 * {@link maxWidths}).
 *
 * @param props - Component props, including a `size` one.
 * @returns Size in CSS units.
 */
const getMaxWidth = (props) => maxWidths[props.size] || maxWidths["medium"];

export const SectionContainer = styled.div`
  margin-left: 4rem;
  margin-right: 4rem;
  width: calc(100% - 4rem);
  @media (min-width: 700px) {
   /*margin-left: 10rem;
   margin-right: 5rem; */
    /* width: calc(100% - 20rem); */
    padding-right: 4rem;
  }
`;

export const PostItemTitle = styled.h2`
  margin: 0;
  color: #eca419;
  text-transform: uppercase;
  @media (min-width: 700px) {
    font-size: 3rem;
  }
`;

export const PostTitle = styled.h1`
  margin: 0;
  color: #eca419;
`;

export const PostCaption = styled(SectionContainer)`
  /* .section-inner.max-percentage */
  margin-left: auto;
  margin-right: auto;
  max-width: ${getMaxWidth({ size: "small" })};
  width: 100%;

  /* .singular .intro-text */
  margin-top: 2rem;
  font-size: 2rem;
  letter-spacing: -0.0315em;
  line-height: 1.4;

  @media (min-width: 700px) {
    margin-top: 2.5rem;
    font-size: 2rem;
  }
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
  @media (min-width: 1220px) {
    font-size: 2rem;
    letter-spacing: -0.03125em;
    line-height: 1;
  }
`;

const PostLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  display: inline-block;
  /*&:hover {
    text-decoration: underline;
  }*/
`;

export const PostInner = styled(SectionContainer)`
  padding-top: 5rem;
  @media (min-width: 700px) {
    padding-top: 5rem;
    padding-bottom: 5rem;
    min-height: 450px;
  }
`;

export const EntryContent = styled.div`
  line-height: 1;
  "Inter",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,sans-serif;
  letter-spacing: normal;

  @media (min-width: 700px) {
    font-size: 2.1rem;
  }

  > *:first-of-type {
    margin-top: 0;
    /* display: flex;
    justify-content: center; */
  }

  figure {
    margin: 2em 0;
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  cite,
  figcaption,
  table,
  address,
  .wp-caption-text,
  .wp-block-file {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      Helvetica, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 3.5rem auto 2rem;
  }

  @media (min-width: 700px) {
    h1,
    h2,
    h3 {
      margin: 6rem auto 3rem;
    }

    h4,
    h5,
    h6 {
      margin: 4.5rem auto 2.5rem;
    }
  }
`;
