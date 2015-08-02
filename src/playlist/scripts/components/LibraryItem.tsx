import * as React from 'react';

interface Props {
	item: string;
	key: number;
	showArrow: boolean;
}

class LibraryItem extends React.Component<Props, any> {
	render() {
		var item = this.props.item;
		return (
			<li data-id={item}>
				<div className='leftBtn'>
					<i className='fa fa-plus'>
					</i>
				</div>
				<div className='libraryText'>
					{item}
				</div>
				<div className='rightBtn'>
					{this.props.showArrow ?
						<i className='fa fa-chevron-right'>
						</i> : ''
					}
				</div>
			</li>
		);
	}
}

export = LibraryItem;
