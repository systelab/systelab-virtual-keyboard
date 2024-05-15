/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

import { Overlay, OverlayRef, OverlaySizeConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentRef, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { VirtualKeyboardLayouts } from './constants';
import { SystelabVirtualKeyboardComponent } from './systelab-virtual-keyboard.component';

interface PositionStrategyOrigin {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SystelabVirtualKeyboardOverlayService {
  private overlayRef!: OverlayRef;
  private open: boolean;
  private layout: VirtualKeyboardLayouts;

  constructor(private readonly overlay: Overlay) {}

  public isCreated(): boolean {
    return !!this.overlayRef;
  }

  public isOpen(): boolean {
    return this.open;
  }

  public create(
    inputOrigin: HTMLInputElement,
    fixedBottom: boolean,
    layout: VirtualKeyboardLayouts = VirtualKeyboardLayouts.default,
  ): ComponentRef<SystelabVirtualKeyboardComponent> {
    this.layout = layout;
    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true,
    });
    this.overlayRef.addPanelClass('virtual-keyboard-overlay-pane');
    if (fixedBottom) {
      this.overlayRef.addPanelClass('virtual-keyboard-fixed-bottom');
    }

    this.updatePositionStrategy(inputOrigin, fixedBottom);
    this.updateSize();

    this.open = true;
    return this.overlayRef.attach(new ComponentPortal(SystelabVirtualKeyboardComponent));
  }

  public destroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.overlayRef = null;
    this.open = false;
  }

  public hasAttached(): boolean {
    return this.overlayRef?.hasAttached();
  }

  private updatePositionStrategy(inputOrigin: HTMLInputElement, fixedBottom: boolean): void {
    this.overlayRef.updatePositionStrategy(this.getPositionStrategy(inputOrigin, fixedBottom));
  }

  private updateSize(): void {
    this.overlayRef.updateSize(this.getOverlaySize());
  }

  private getPositionStrategy(inputOrigin: HTMLInputElement, fixedBottom: boolean): PositionStrategy {
    if (fixedBottom) {
      return this.overlay.position().global().centerHorizontally().bottom('0');
    }

    const pointWithDimensions: PositionStrategyOrigin = this.computePositionStrategyOrigin(inputOrigin);

    return this.overlay
      .position()
      .flexibleConnectedTo(pointWithDimensions)
      .withFlexibleDimensions(false)
      .withLockedPosition(true)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ]);
  }

  private getOverlaySize(): OverlaySizeConfig {
    const overlayWidth = this.layout === VirtualKeyboardLayouts.numeric ? '400px' : '1200px';

    return {
      width: overlayWidth,
      maxWidth: overlayWidth,
      minWidth: overlayWidth,
    };
  }

  private computePositionStrategyOrigin(inputOrigin: HTMLInputElement): PositionStrategyOrigin {
    const overlayOffsetX = this.computeOverlayOffsetX(inputOrigin);
    const { width: overlayWidthString } = this.getOverlaySize();
    const overlayWidth = Number((overlayWidthString as string).replace('px', ''));
    const {x, y, width, height} = inputOrigin.getBoundingClientRect();
    return {
      width,
      height,
      x: width < overlayWidth ? x - overlayOffsetX : x + overlayOffsetX,
      y,
    };
  }

  private computeOverlayOffsetX(inputOrigin: HTMLInputElement): number {
    const { width: overlayWidthString } = this.getOverlaySize();
    const overlayWidth = Number((overlayWidthString as string).replace('px', ''));
    const inputWidth = inputOrigin.getBoundingClientRect().width;

    const extraWidth = overlayWidth - inputWidth;

    return Math.abs(extraWidth) / 2;
  }
}
