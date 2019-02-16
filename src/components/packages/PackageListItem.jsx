import React, { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// import AntdIcon from '@ant-design/icons-react'
// import { GithubFill } from '@ant-design/icons'
import { get } from 'lodash'
import { formatRoute } from 'react-router-named-routes'
import { Redirect, Link } from 'react-router-dom'
import { Query } from 'react-apollo'
// import { ZosCodeSnippet } from '~/components/ZosCodeSnippet'
import { ErrorMessage } from '~/components/ErrorMessage'
// import { GithubProfileImage } from '~/components/GithubProfileImage'
import { ShortText } from '~/components/ShortText'
import { PackageListItemLoader } from '~/components/hooks/PackageListItemLoader'
import { vouchingQueries } from '~/queries/vouchingQueries'
import { displayWeiToEther } from '~/utils/displayWeiToEther'
import * as routes from '~/../config/routes'

export const PackageListItem = ReactTimeout(class _PackageListItem extends PureComponent {
  state = {}

  static propTypes = {
    package: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.setTimeout(() => {
      this.setState({ startAnimating: true })
    }, 200)
  }

  handleGitHubLinkClick = (url) => {
    if (window) {
      window.location.href = url
    }
  }

  handleCodeClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  handleCopyClick = () => {
    this.setState({ copied: true })

    this.props.setTimeout(() => {
      this.setState({ copied: false })
    }, 3000)
  }

  render () {
    return (
      <Query
        query={vouchingQueries.packageQuery}
        variables={{
          uri: this.props.package.metadataURI,
          id: this.props.package.id.toString()
        }}>
        {
          ({ loading, error, data }) => {
            if (loading) return <PackageListItemLoader />
            if (error) return <ErrorMessage errorMessage={error} />

            const { metadata, Vouching } = this.props.data
            const { description, version } = metadata || {}
            // const { Challenged } = Vouching || {}

            const id = parseInt(this.props.package.id, 10)
            const ipfsHash = '0xXYAZ'
            const link = formatRoute(routes.HOOK, { ipfsHash })

            const { owner } = { owner: 'asdf' }
            // const { owner } = gh(this.props.package.metadataURI || '')
            // const { owner, repo } = gh(this.props.package.metadataURI || '')

            if (this.state.toPackage) {
              return <Redirect to={link} />
            }

            // let challengeCount = 0
            // if (Challenged) {
            //   challengeCount = Challenged.length
            // }
            //
            // let challenges
            // if (challengeCount === 1) {
            //   challenges = <span>1 challenge</span>
            // } else if (challengeCount > 1) {
            //   challenges = <span>{challengeCount} challenges</span>
            // }

            const animatingCssClassNames = classnames(
              'fade-in',
              'slide-up',
              'medium',
              {
                'slide-up-enter': this.state.startAnimating,
                'fade-in-enter': this.state.startAnimating
              }
            )

            return (
              <div className='list-item-container'>
                <div className='list-item'>
                    <span
                      className={`
                      ${animatingCssClassNames}
                      list-item__cell
                      list-item__cell--id
                      has-text-grey
                      has-text-weight-light
                    `}>
                      <Link
                        to={link}
                        className='no-select title is-size-4 has-text-weight-normal'
                      >
                      #{this.props.index + 1} &nbsp;
                      </Link>
                    </span>

                  <span className={`
                    ${animatingCssClassNames}
                    list-item__cell
                    list-item__cell--image
                  `}>
                    <Link
                      to={link}
                      className='no-select'
                    >
                      {/* <GithubProfileImage user={owner} /> */}
                      MNB
                    </Link>
                  </span>

                  <span className={`
                    ${animatingCssClassNames}
                    list-item__cell
                    list-item__cell--title
                  `}>
                    <Link
                      to={link}
                      className='no-select'
                    >
                      <h4 className='is-size-4 has-text-weight-normal is-inline-grid-top'>
                        {get(metadata, 'name')}
                        <span className='package-item--version has-text-grey has-text-weight-light is-size-5'>
                        v{get(metadata, 'version')}
                        </span>
                      </h4>

                      <p className='is-size-6 description is-inline-grid-bottom has-text-grey'>
                        <ShortText text={description} maxLength={140} />
                      </p>
                    </Link>
                  </span>

                  {/*
                <ZosCodeSnippet packageName={get(metadata, 'name')} />

                <button
                  className={classnames(
                    'package-item--github-icon',
                    'is-text',
                    'button',
                    'fade-in',
                    'slide-up',
                    'medium',
                    {
                      'slide-up-enter': this.state.startAnimating,
                      'fade-in-enter': this.state.startAnimating
                    }
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()

                    // this should be coming from the json data
                    const url = `https://github.com/${repo}`

                    this.handleGitHubLinkClick(url)
                  }}
                >
                  <AntdIcon type={GithubFill} className='antd-icon' />
                </button>
                */}

                  <span className='list-item__cell list-item__cell--blank'>
                    <Link
                      to={link}
                      className='no-select'
                    >
                    &nbsp;
                    </Link>
                  </span>

                  <span className={`
                  ${animatingCssClassNames}
                  list-item__cell
                  list-item__cell--view-more
                  has-text-right
                `}>
                    <Link
                      to={link}
                      className='no-select list-item--view-grid'
                    >
                      <span className='has-text-info is-size-6 is-monospaced'>
                      View More &gt;
                      </span>

                      <span className='list-item--view-grid'>
                        <h6 className='subtitle is-size-7 list-item--subtitle is-monospaced'>
                        VOUCHED
                        </h6>

                        icon

                        <h3 className='is-inline-block is-size-3 has-text-weight-light list-item--num-tokens'>
                          {displayWeiToEther(get(Vouching, 'entry.totalVouched'))}
                        </h3>

                        {/*
                        <span
                          to={link}
                          className='is-block list-item--challenges-link'
                        >
                          {challenges}
                        </span>
                      */}

                        <span className='has-text-info is-size-6 is-monospaced list-item--view-more-link'>
                        View More&gt;
                        </span>
                      </span>
                    </Link>
                  </span>

                </div>
              </div>
            )
          }
        }
      </Query>
    )
  }
})